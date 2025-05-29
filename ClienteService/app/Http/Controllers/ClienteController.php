<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ClienteController extends Controller
{
    // Listar todos los clientes
    public function index()
    {
        return response()->json(Cliente::all());
    }

    // Crear un nuevo cliente
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:clientes,email',
            'telefono' => 'required|string|max:15',
            'direccion' => 'required|string|max:255',
            'razon_social' => 'nullable|string|max:255',
            'fecha_nacimiento' => 'nullable|date',
            'rol' => 'sometimes|string|max:20',
        ]);
        $validated['fecha_registro'] = now();
        $cliente = Cliente::create($validated);
        return response()->json($cliente, 201);
    }

    // Mostrar un cliente específico
    public function show($id)
    {
        $cliente = Cliente::findOrFail($id);
        return response()->json($cliente);
    }

    // Actualizar un cliente
    public function update(Request $request, $id)
    {
        $cliente = Cliente::findOrFail($id);
        $validated = $request->validate([
            'nombre' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|max:255|unique:clientes,email,' . $id,
            'telefono' => 'sometimes|required|string|max:15',
            'direccion' => 'nullable|string|max:255',
            'fecha_nacimiento' => 'nullable|date',
        ]);
        $cliente->update($validated);
        return response()->json($cliente);
    }

    // Eliminar un cliente y su usuario relacionado en AuthService
    public function destroy($id)
    {
        $cliente = Cliente::findOrFail($id);
        $userId = $cliente->user_id;
        $cliente->delete();
        // Llamar a AuthService para eliminar el usuario
        try {
            Http::delete(env('AUTH_SERVICE_URL') . '/api/users/' . $userId);
        } catch (\Exception $e) {
            // Manejo de error opcional
        }
        return response()->json(['message' => 'Cliente y usuario eliminados']);
    }

    // Sincronizar cliente desde AuthService
    public function syncFromAuth(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|integer',
            'nombre' => 'required|string|max:255', // Cambiado de 'name' a 'nombre'
            'email' => 'required|email|max:255',
            'telefono' => 'required|string|max:15',
            'direccion' => 'required|string|max:255',
            'razon_social' => 'nullable|string|max:255',
            'rol' => 'sometimes|string|max:20',
        ]);
        $cliente = Cliente::updateOrCreate(
            ['user_id' => $validated['user_id']],
            [
                'nombre' => $validated['nombre'],
                'email' => $validated['email'],
                'telefono' => $validated['telefono'],
                'direccion' => $validated['direccion'],
                'razon_social' => $validated['razon_social'] ?? null,
                'rol' => $validated['rol'] ?? 'cliente',
                'fecha_registro' => now(),
            ]
        );
        return response()->json($cliente, 201);
    }

    // Actualizar solo el rol de un cliente y sincronizar con AuthService
    public function updateRol(Request $request, $id)
    {
        $cliente = Cliente::findOrFail($id);
        $validated = $request->validate([
            'rol' => 'required|string|max:20',
        ]);
        $cliente->rol = $validated['rol'];
        $cliente->save();
        // Sincronizar con AuthService
        try {
            Http::post(env('AUTH_SERVICE_URL') . '/api/users/sync-rol', [
                'user_id' => $cliente->user_id,
                'rol' => $validated['rol'],
            ]);
        } catch (\Exception $e) {
            // Manejo de error opcional
        }
        return response()->json($cliente);
    }
}
