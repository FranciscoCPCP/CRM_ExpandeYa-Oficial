<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    // Registro de usuario (cliente o admin)
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'telefono' => 'required|string|max:255',
            'direccion' => 'required|string|max:255',
            // 'tipo' ya no se recibe del formulario público
            // campos extra para cliente se envían al microservicio correspondiente
        ]);
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'estado' => 'activo',
            'rol' => 'cliente', // Siempre cliente en registro público
        ]);
        // Siempre se crea como cliente
        $payload = [
            'user_id' => $user->id,
            'nombre' => $user->name,
            'email' => $user->email,
            'estado' => $user->estado,
            'telefono' => $request->input('telefono'),
            'direccion' => $request->input('direccion'),
            'razon_social' => $request->input('razon_social'),
            'rol' => $user->rol, // Enviar el rol al sincronizar
        ];
        Http::post(env('CLIENTE_SERVICE_URL') . '/api/clientes/sync', $payload);
        return response()->json(['user' => $user], 201);
    }

    // Login
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        $user = JWTAuth::user();
        if ($user->estado !== 'activo') {
            return response()->json(['error' => 'Usuario inactivo o banneado'], 403);
        }
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'user' => $user,
        ]);
    }

    // Perfil del usuario autenticado
    public function me(Request $request)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            return response()->json($user);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Token inválido o no enviado'], 401);
        }
    }

    // Logout
    public function logout(Request $request)
    {
        try {
            JWTAuth::invalidate(JWTAuth::getToken());
            return response()->json(['message' => 'Sesión cerrada']);
        } catch (JWTException $e) {
            return response()->json(['error' => 'No se pudo cerrar sesión'], 500);
        }
    }

    // Actualizar perfil (solo nombre y password)
    public function updateProfile(Request $request)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (JWTException $e) {
            return response()->json(['error' => 'Token inválido o no enviado'], 401);
        }
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'password' => 'sometimes|required|string|min:6',
        ]);
        if (isset($validated['name'])) {
            $user->name = $validated['name'];
        }
        if (isset($validated['password'])) {
            $user->password = Hash::make($validated['password']);
        }
        $user->save();
        return response()->json($user);
    }

    // Solicitar recuperación de contraseña
    public function forgotPassword(Request $request)
    {
        $request->validate(['email' => 'required|email']);
        $status = Password::sendResetLink(
            $request->only('email')
        );
        return $status === Password::RESET_LINK_SENT
            ? response()->json(['message' => 'Enlace de recuperación enviado'])
            : response()->json(['error' => 'No se pudo enviar el enlace'], 400);
    }

    // Restablecer contraseña
    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|string|min:6|confirmed',
        ]);
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->password = Hash::make($password);
                $user->save();
            }
        );
        return $status === Password::PASSWORD_RESET
            ? response()->json(['message' => 'Contraseña restablecida'])
            : response()->json(['error' => 'No se pudo restablecer la contraseña'], 400);
    }

    // Crear un nuevo admin (solo superadmin)
    public function createAdmin(Request $request)
    {
        // Aquí deberías validar que el usuario autenticado es superadmin
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'telefono' => 'required|string|max:255',
            'direccion' => 'required|string|max:255',
            'area' => 'required|string|max:255',
        ]);
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'estado' => 'activo',
            'rol' => 'admin', // Rol admin
        ]);
        // Sincronizar con AdminService
        $payload = [
            'user_id' => $user->id,
            'nombre' => $user->name,
            'email' => $user->email,
            'telefono' => $validated['telefono'],
            'direccion' => $validated['direccion'],
            'area' => $validated['area'],
            'estado' => $user->estado,
            'rol' => $user->rol, // Enviar el rol al sincronizar
        ];
        Http::post(env('ADMIN_SERVICE_URL') . '/api/admins/sync', $payload);
        return response()->json(['user' => $user], 201);
    }

    // Sincronizar rol desde AdminService
    public function syncAdminRole(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|integer',
            'rol' => 'required|string|max:20',
        ]);
        $user = User::findOrFail($validated['user_id']);
        $user->rol = $validated['rol'];
        $user->save();
        return response()->json(['message' => 'Rol actualizado en users', 'user' => $user]);
    }

    // Eliminar un usuario por ID (usado por otros servicios)
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(['message' => 'Usuario eliminado']);
    }
}
