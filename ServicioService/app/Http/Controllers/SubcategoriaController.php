<?php

namespace App\Http\Controllers;

use App\Models\Subcategoria;
use App\Models\Categoria;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class SubcategoriaController extends Controller
{
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
        $subcategorias = Subcategoria::with('categoria')->get()->map(function ($sub) {
            return [
                'id' => $sub->id,
                'nombre' => $sub->nombre,
                'categoria_id' => $sub->categoria_id,
                'categoria_nombre' => $sub->categoria ? $sub->categoria->nombre : null,
            ];
        });
        return response()->json($subcategorias);
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
            'nombre' => 'required|string',
            'categoria_id' => 'required|integer|exists:categorias,id',
        ]);
        $subcategoria = Subcategoria::create($validated);
        return response()->json($subcategoria, 201);
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
        $subcategoria = Subcategoria::findOrFail($id);
        $validated = $request->validate([
            'nombre' => 'required|string',
            'categoria_id' => 'required|integer|exists:categorias,id',
        ]);
        $subcategoria->update($validated);
        return response()->json($subcategoria);
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
        $subcategoria = Subcategoria::findOrFail($id);
        $subcategoria->delete();
        return response()->json(['message' => 'Subcategoría eliminada']);
    }
}
