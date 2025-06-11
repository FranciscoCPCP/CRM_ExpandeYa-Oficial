<?php

namespace App\Http\Controllers;

use App\Models\Servicio;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Facades\JWTAuth;

class ServicioController extends Controller
{
    // Listar todos los servicios
    public function index()
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json(['error' => 'Token expirado'], 401);
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['error' => 'Token inválido'], 401);
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['error' => 'Token no proporcionado'], 401);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error de autenticación'], 401);
        }
        return response()->json(Servicio::all());
    }

    // Crear un nuevo servicio
    public function store(Request $request)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json(['error' => 'Token expirado'], 401);
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['error' => 'Token inválido'], 401);
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['error' => 'Token no proporcionado'], 401);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error de autenticación'], 401);
        }
        if (!in_array($user->rol ?? $user->tipo ?? null, ['admin', 'superadmin'])) {
            return response()->json(['error' => 'No autorizado'], 403);
        }
        $validated = $request->validate([
            'nombre' => 'required|string|max:255|unique:servicios,nombre',
            'descripcion' => 'required|string',
            'precio' => 'nullable|numeric',
            'precio_variable' => 'required|boolean',
            'estado' => 'required|in:activo,suspendido',
            'categoria' => 'required|string',
            'subcategoria' => 'required|string',
        ]);
        if ($validated['precio_variable']) {
            $validated['precio'] = null;
        } else {
            if (!isset($validated['precio'])) {
                return response()->json(['error' => 'El campo precio es obligatorio si precio_variable es false'], 422);
            }
        }
        $validated['uuid'] = Str::uuid();
        $servicio = Servicio::create($validated);
        return response()->json(['servicio' => $servicio, 'message' => 'Servicio creado correctamente'], 201);
    }

    // Mostrar un servicio específico
    public function show($id)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json(['error' => 'Token expirado'], 401);
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['error' => 'Token inválido'], 401);
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['error' => 'Token no proporcionado'], 401);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error de autenticación'], 401);
        }
        $servicio = Servicio::findOrFail($id);
        return response()->json($servicio);
    }

    // Actualizar un servicio
    public function update(Request $request, $id)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json(['error' => 'Token expirado'], 401);
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['error' => 'Token inválido'], 401);
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['error' => 'Token no proporcionado'], 401);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error de autenticación'], 401);
        }
        if (!in_array($user->rol ?? $user->tipo ?? null, ['admin', 'superadmin'])) {
            return response()->json(['error' => 'No autorizado'], 403);
        }
        $servicio = Servicio::findOrFail($id);
        $validated = $request->validate([
            'nombre' => 'sometimes|required|string|max:255|unique:servicios,nombre,' . $id,
            'descripcion' => 'sometimes|required|string',
            'precio' => 'nullable|numeric',
            'precio_variable' => 'sometimes|required|boolean',
            'estado' => 'sometimes|required|in:activo,suspendido',
            'categoria' => 'sometimes|required|string',
            'subcategoria' => 'sometimes|required|string',
        ]);
        if (isset($validated['precio_variable'])) {
            if ($validated['precio_variable']) {
                $validated['precio'] = null;
            } else {
                if (!isset($validated['precio']) && $servicio->precio === null) {
                    return response()->json(['error' => 'El campo precio es obligatorio si precio_variable es false'], 422);
                }
            }
        }
        $servicio->update($validated);
        return response()->json(['servicio' => $servicio, 'message' => 'Servicio actualizado correctamente']);
    }

    // Eliminar un servicio
    public function destroy($id)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json(['error' => 'Token expirado'], 401);
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['error' => 'Token inválido'], 401);
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['error' => 'Token no proporcionado'], 401);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error de autenticación'], 401);
        }
        if (!in_array($user->rol ?? $user->tipo ?? null, ['admin', 'superadmin'])) {
            return response()->json(['error' => 'No autorizado'], 403);
        }
        $servicio = Servicio::findOrFail($id);
        $servicio->delete();
        return response()->json(['message' => 'Servicio eliminado correctamente']);
    }

    // Endpoint para sincronización con otros microservicios
    public function sync(Request $request)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json(['error' => 'Token expirado'], 401);
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['error' => 'Token inválido'], 401);
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['error' => 'Token no proporcionado'], 401);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error de autenticación'], 401);
        }
        // Aquí se puede implementar la lógica de sincronización según necesidades futuras
        return response()->json(['message' => 'Sync endpoint listo para integración'], 200);
    }
}
