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
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    // Registro de usuario (cliente o admin)
    public function register(Request $request)
    {
        // Validar datos básicos para users
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            // Solo datos esenciales para AuthService
            'rol' => 'sometimes|string|in:cliente,admin,superadmin',
        ]);
        // Determinar el rol: si viene en la petición y es válido, úsalo; si no, por defecto 'cliente'
        $rol = $validated['rol'] ?? 'cliente';
        // Crear usuario en tabla users
        $user = User::create([
            'name' => $validated['nombre'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'estado' => 'activo',
            'rol' => $rol,
        ]);
        // Enviar datos extendidos a ClienteService
        $payload = [
            'user_id' => $user->id,
            'nombre' => $user->name,
            'email' => $user->email,
            'telefono' => $request->input('telefono'),
            'direccion' => $request->input('direccion'),
            'region' => $request->input('region'),
            'provincia' => $request->input('provincia'),
            'distrito' => $request->input('distrito'),
            'tipo_cliente' => $request->input('tipo_cliente'),
            'actividad' => $request->input('actividad'),
            'nombre_negocio' => $request->input('nombre_negocio'),
            'idea_emprendimiento' => $request->input('idea_emprendimiento'),
            'fecha_nacimiento' => $request->input('fecha_nacimiento'),
            'rol' => $user->rol,
        ];
        try {
            $response = Http::post(env('CLIENTE_SERVICE_URL') . '/api/clientes/sync', $payload);
            if (!$response->successful()) {
                Log::error('Error al sincronizar con ClienteService: ' . $response->body());
                $user->delete();
                return response()->json([
                    'error' => 'Error al sincronizar con ClienteService',
                    'detalle' => $response->json('error') ?? $response->body(),
                ], 500);
            }
        } catch (\Exception $e) {
            Log::error('Excepción al sincronizar con ClienteService: ' . $e->getMessage());
            $user->delete();
            return response()->json(['error' => 'Error al sincronizar con ClienteService', 'detalle' => $e->getMessage()], 500);
        }
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
        // Devolver el usuario con el campo 'rol' explícito
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'rol' => $user->rol, // <-- aquí el campo correcto
                'estado' => $user->estado,
            ],
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
        // Validar que el usuario autenticado es superadmin (lógica omitida aquí)
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            // Solo datos esenciales para AuthService
        ]);
        // Crear usuario en tabla users
        $user = User::create([
            'name' => $validated['nombre'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'estado' => 'activo',
            'rol' => 'admin',
        ]);
        // Enviar datos extendidos a AdminService
        $payload = [
            'user_id' => $user->id,
            'nombre' => $user->name,
            'email' => $user->email,
            'telefono' => $request->input('telefono'),
            'direccion' => $request->input('direccion'),
            'rol' => $user->rol,
        ];
        try {
            Http::post(env('ADMIN_SERVICE_URL') . '/api/admins/sync', $payload);
        } catch (\Exception $e) {
            $user->delete();
            return response()->json(['error' => 'Error al sincronizar con AdminService'], 500);
        }
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

    // Actualizar usuario desde otros microservicios (por ID)
    public function updateUserFromService(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|max:255|unique:users,email,' . $id,
            'rol' => 'sometimes|string|max:20',
        ]);
        if (isset($validated['name'])) {
            $user->name = $validated['name'];
        }
        if (isset($validated['email'])) {
            $user->email = $validated['email'];
        }
        if (isset($validated['rol'])) {
            $user->rol = $validated['rol'];
        }
        $user->save();
        return response()->json(['message' => 'Usuario actualizado', 'user' => $user]);
    }
}
