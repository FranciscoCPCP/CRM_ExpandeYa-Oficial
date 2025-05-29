<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;

class AdminController extends Controller
{
    // Listar todos los administradores
    public function index()
    {
        return response()->json(Admin::all());
    }

    // Crear un nuevo administrador
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|integer',
            'nombre' => 'required|string|max:255',
            'telefono' => 'required|string|max:15',
            'direccion' => 'required|string|max:255',
            'area' => 'required|string|max:255',
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
        $admin = Admin::findOrFail($id);
        $validated = $request->validate([
            'nombre' => 'sometimes|required|string|max:255',
            'telefono' => 'nullable|string|max:15',
            'direccion' => 'nullable|string|max:255',
            'area' => 'nullable|string|max:255',
            'estado' => 'nullable|string|max:50',
        ]);
        $admin->update($validated);
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
            'direccion' => 'required|string|max:255',
            'area' => 'required|string|max:255',
            'rol' => 'sometimes|string|max:20',
        ]);
        $admin = Admin::updateOrCreate(
            ['user_id' => $validated['user_id']],
            [
                'nombre' => $validated['nombre'],
                'telefono' => $validated['telefono'],
                'direccion' => $validated['direccion'],
                'area' => $validated['area'],
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
        $admin->delete();
        // Llamar a AuthService para eliminar el usuario
        try {
            Http::delete(env('AUTH_SERVICE_URL') . '/api/users/' . $userId);
        } catch (\Exception $e) {
            // Manejo de error opcional
        }
        return response()->json(['message' => 'Administrador y usuario eliminados']);
    }
}
