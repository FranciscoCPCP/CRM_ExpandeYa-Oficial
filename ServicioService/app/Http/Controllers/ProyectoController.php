<?php

namespace App\Http\Controllers;

use App\Models\Proyecto;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Facades\JWTAuth;

class ProyectoController extends Controller
{
    // Listar todos los proyectos (admin/superadmin)
    public function index()
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (\Exception $e) {
            return response()->json(['error' => 'Token inválido'], 401);
        }
        if (!in_array($user->rol ?? $user->tipo ?? null, ['admin', 'superadmin'])) {
            return response()->json(['error' => 'No autorizado'], 403);
        }
        // Incluir datos del cliente asociado a cada proyecto
        $proyectos = \App\Models\Proyecto::with(['paquete.cliente'])->get();
        $result = $proyectos->map(function ($proy) {
            return [
                'id' => $proy->id,
                'nombre' => $proy->nombre,
                'estado' => $proy->estado,
                'paquete_id' => $proy->paquete_id,
                'avance' => $proy->avance ?? 0,
                'servicios' => $proy->paquete && is_array($proy->paquete->servicios) ? $proy->paquete->servicios : [],
                'cliente_nombre' => $proy->paquete && $proy->paquete->cliente ? $proy->paquete->cliente->nombre : null,
            ];
        });
        return response()->json($result);
    }

    // Listar proyectos de un paquete
    public function proyectosPaquete($paquete_id)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (\Exception $e) {
            return response()->json(['error' => 'Token inválido'], 401);
        }
        $proyectos = Proyecto::where('paquete_id', $paquete_id)->get();
        return response()->json($proyectos);
    }

    // Crear proyecto (admin/superadmin)
    public function store(Request $request)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (\Exception $e) {
            return response()->json(['error' => 'Token inválido'], 401);
        }
        if (!in_array($user->rol ?? $user->tipo ?? null, ['admin', 'superadmin'])) {
            return response()->json(['error' => 'No autorizado'], 403);
        }
        $validated = $request->validate([
            'paquete_id' => 'required|integer',
            'nombre' => 'required|string|max:255',
            'estado' => 'nullable|in:pendiente,en_progreso,finalizado,entregado',
            'notas' => 'nullable|string',
        ]);
        $validated['uuid'] = Str::uuid();
        $proyecto = Proyecto::create($validated);
        return response()->json(['proyecto' => $proyecto, 'message' => 'Proyecto creado correctamente'], 201);
    }

    // Ver un proyecto específico
    public function show($id)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (\Exception $e) {
            return response()->json(['error' => 'Token inválido'], 401);
        }
        $proyecto = Proyecto::findOrFail($id);
        return response()->json($proyecto);
    }

    // Actualizar estado del proyecto (admin/superadmin)
    public function update(Request $request, $id)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (\Exception $e) {
            return response()->json(['error' => 'Token inválido'], 401);
        }
        if (!in_array($user->rol ?? $user->tipo ?? null, ['admin', 'superadmin'])) {
            return response()->json(['error' => 'No autorizado'], 403);
        }
        $proyecto = Proyecto::findOrFail($id);
        $validated = $request->validate([
            'estado' => 'required|in:pendiente,en_progreso,finalizado,entregado',
            'notas' => 'nullable|string',
        ]);
        $proyecto->update($validated);
        return response()->json(['proyecto' => $proyecto, 'message' => 'Estado actualizado']);
    }
}
