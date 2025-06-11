<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    // Listar todos los administradores (solo para admins normales, excluye superadmin)
    public function index()
    {
        try {
            $user = \Tymon\JWTAuth\Facades\JWTAuth::parseToken()->authenticate();
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json(['error' => 'Token expirado'], 401);
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['error' => 'Token inválido'], 401);
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['error' => 'Token no proporcionado'], 401);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error de autenticación'], 401);
        }
        // Si es superadmin, ve todos
        if (($user->rol ?? $user->role ?? null) === 'superadmin') {
            return response()->json(Admin::all());
        }
        // Si es admin normal, excluye superadmin
        $admins = Admin::where('rol', '!=', 'superadmin')->get();
        return response()->json($admins);
    }

    // Crear un nuevo administrador
    public function store(Request $request)
    {
        $user = \Tymon\JWTAuth\Facades\JWTAuth::parseToken()->authenticate();
        if (($user->rol ?? $user->role ?? null) !== 'superadmin') {
            return response()->json(['error' => 'No autorizado. Solo el superadmin puede crear administradores.'], 403);
        }

        $validated = $request->validate([
            'user_id' => 'required|integer',
            'nombre' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:admins,email',
            'telefono' => 'required|string|max:15',
            'direccion' => 'nullable|string|max:255',
            'rol' => 'sometimes|string|max:20',
        ]);
        $admin = Admin::create($validated);
        return response()->json($admin, 201);
    }

    // Mostrar un administrador específico
    public function show($id)
    {
        $admin = Admin::findOrFail($id);
        return response()->json($admin);
    }

    // Actualizar un administrador
    public function update(Request $request, $id)
    {
        $user = \Tymon\JWTAuth\Facades\JWTAuth::parseToken()->authenticate();
        if (($user->rol ?? $user->role ?? null) !== 'superadmin') {
            return response()->json(['error' => 'No autorizado. Solo el superadmin puede actualizar administradores.'], 403);
        }

        $admin = Admin::findOrFail($id);
        $validated = $request->validate([
            'nombre' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|max:255|unique:admins,email,' . $id,
            'telefono' => 'sometimes|required|string|max:15',
            'direccion' => 'nullable|string|max:255',
            'rol' => 'sometimes|string|max:20',
        ]);
        $admin->update($validated);

        // Sincronizar con AuthService
        try {
            $payload = [];
            if (isset($validated['nombre'])) $payload['name'] = $validated['nombre'];
            if (isset($validated['email'])) $payload['email'] = $validated['email'];
            if (isset($validated['telefono'])) $payload['telefono'] = $validated['telefono'];
            if (array_key_exists('direccion', $validated)) $payload['direccion'] = $validated['direccion'];
            if (isset($validated['rol'])) $payload['rol'] = $validated['rol'];
            if (!empty($payload)) {
                $response = \Illuminate\Support\Facades\Http::put(env('AUTH_SERVICE_URL') . '/api/users/' . $admin->user_id, $payload);
                if ($response->failed()) {
                    return response()->json([
                        'message' => 'Admin actualizado localmente, pero error al sincronizar con AuthService',
                        'error' => $response->json('error') ?? $response->body(),
                        'admin' => $admin
                    ], 500);
                }
            }
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Admin actualizado localmente, pero error al sincronizar con AuthService',
                'error' => $e->getMessage(),
                'admin' => $admin
            ], 500);
        }
        return response()->json($admin);
    }

    // Sincronizar admin desde AuthService
    public function syncFromAuth(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|integer',
            'nombre' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'telefono' => 'required|string|max:15',
            'direccion' => 'nullable|string|max:255',
            'rol' => 'sometimes|string|max:20',
        ]);
        $admin = Admin::updateOrCreate(
            ['user_id' => $validated['user_id']],
            [
                'nombre' => $validated['nombre'],
                'email' => $validated['email'],
                'telefono' => $validated['telefono'],
                'direccion' => $validated['direccion'],
                'rol' => $validated['rol'] ?? 'admin',
            ]
        );
        return response()->json($admin, 201);
    }

    // Eliminar un administrador y su usuario relacionado en AuthService
    public function destroy($id)
    {
        $admin = Admin::findOrFail($id);
        $userId = $admin->user_id;
        // Primero eliminar en AuthService
        try {
            $response = Http::delete(env('AUTH_SERVICE_URL') . '/api/users/' . $userId);
            if ($response->failed()) {
                return response()->json([
                    'message' => 'No se pudo eliminar el usuario en AuthService. El admin NO ha sido eliminado localmente.',
                    'error' => $response->json('error') ?? $response->body(),
                ], 500);
            }
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al eliminar usuario en AuthService. El admin NO ha sido eliminado localmente.',
                'error' => $e->getMessage(),
            ], 500);
        }
        // Si todo bien, eliminar el admin local
        $admin->delete();
        return response()->json(['message' => 'Administrador y usuario eliminados correctamente']);
    }

    // Listar admins para admin normal (sin superadmin)
    public function listForAdmin()
    {
        // Excluye al superadmin
        $admins = Admin::where('rol', '!=', 'superadmin')->get();
        return response()->json($admins);
    }
}
