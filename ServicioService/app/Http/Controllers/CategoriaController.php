<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class CategoriaController extends Controller
{
    public function index()
    {
        // Solo admin y superadmin pueden ver categorías
        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (\Exception $e) {
            return response()->json(['error' => 'Token inválido'], 401);
        }
        if (!in_array($user->rol ?? $user->tipo ?? null, ['admin', 'superadmin'])) {
            return response()->json(['error' => 'No autorizado'], 403);
        }
        return response()->json(Categoria::all());
    }

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
            'nombre' => 'required|string|unique:categorias,nombre',
        ]);
        $categoria = Categoria::create($validated);
        return response()->json($categoria, 201);
    }

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
        $categoria = Categoria::findOrFail($id);
        $validated = $request->validate([
            'nombre' => 'required|string|unique:categorias,nombre,' . $id,
        ]);
        $categoria->update($validated);
        return response()->json($categoria);
    }

    public function destroy($id)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (\Exception $e) {
            return response()->json(['error' => 'Token inválido'], 401);
        }
        if (!in_array($user->rol ?? $user->tipo ?? null, ['admin', 'superadmin'])) {
            return response()->json(['error' => 'No autorizado'], 403);
        }
        $categoria = Categoria::findOrFail($id);
        $categoria->delete();
        return response()->json(['message' => 'Categoría eliminada']);
    }
}
