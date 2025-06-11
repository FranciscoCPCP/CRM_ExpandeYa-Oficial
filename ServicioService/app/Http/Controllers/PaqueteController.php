<?php

namespace App\Http\Controllers;

use App\Models\Paquete;
use App\Models\Servicio;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Facades\JWTAuth;

class PaqueteController extends Controller
{
    // Listar todos los paquetes (admin/superadmin)
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
        return response()->json(Paquete::all());
    }

    // Listar paquetes de un cliente (cliente o admin)
    public function paquetesCliente($cliente_id)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (\Exception $e) {
            return response()->json(['error' => 'Token inválido'], 401);
        }
        if ($user->rol === 'cliente' && $user->id != $cliente_id) {
            return response()->json(['error' => 'No autorizado'], 403);
        }
        $paquetes = Paquete::where('cliente_id', $cliente_id)->get();
        return response()->json($paquetes);
    }

    // Crear paquete (cliente)
    public function store(Request $request)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (\Exception $e) {
            return response()->json(['error' => 'Token inválido'], 401);
        }
        if ($user->rol !== 'cliente') {
            return response()->json(['error' => 'Solo clientes pueden crear paquetes'], 403);
        }
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'servicios' => 'required|array',
            'servicios.*' => 'uuid',
            'notas' => 'nullable|string',
        ]);
        $validated['cliente_id'] = $user->id;
        $validated['estado'] = 'pendiente';
        $validated['uuid'] = Str::uuid();
        $paquete = Paquete::create($validated);
        return response()->json(['paquete' => $paquete, 'message' => 'Paquete creado correctamente'], 201);
    }

    // Ver un paquete específico (admin/superadmin/cliente dueño)
    public function show($id)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (\Exception $e) {
            return response()->json(['error' => 'Token inválido'], 401);
        }
        $paquete = Paquete::findOrFail($id);
        if ($user->rol === 'cliente' && $user->id != $paquete->cliente_id) {
            return response()->json(['error' => 'No autorizado'], 403);
        }
        return response()->json($paquete);
    }

    // Actualizar estado del paquete (admin/superadmin)
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
        $paquete = Paquete::findOrFail($id);
        $validated = $request->validate([
            'estado' => 'required|in:pendiente,en_progreso,finalizado,entregado',
            'notas' => 'nullable|string',
        ]);
        $paquete->update($validated);
        return response()->json(['paquete' => $paquete, 'message' => 'Estado actualizado']);
    }
}
