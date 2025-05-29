<?php

namespace App\Http\Controllers;

use App\Models\Notificacion;
use Illuminate\Http\Request;

class NotificacionController extends Controller
{
    // Listar todas las notificaciones
    public function index()
    {
        return response()->json(Notificacion::all());
    }

    // Crear una nueva notificación
    public function store(Request $request)
    {
        $validated = $request->validate([
            'titulo' => 'required|string|max:255',
            'mensaje' => 'required|string',
            'tipo' => 'required|string',
            'user_id' => 'required|integer',
            'canal' => 'required|string',
            'estado' => 'nullable|string',
            'plantilla' => 'nullable|string',
            'datos' => 'nullable|json',
        ]);
        $notificacion = Notificacion::create($validated);
        return response()->json($notificacion, 201);
    }

    // Mostrar una notificación específica
    public function show($id)
    {
        $notificacion = Notificacion::findOrFail($id);
        return response()->json($notificacion);
    }

    // Actualizar una notificación
    public function update(Request $request, $id)
    {
        $notificacion = Notificacion::findOrFail($id);
        $validated = $request->validate([
            'titulo' => 'sometimes|required|string|max:255',
            'mensaje' => 'sometimes|required|string',
            'tipo' => 'sometimes|required|string',
            'user_id' => 'sometimes|required|integer',
            'canal' => 'sometimes|required|string',
            'estado' => 'nullable|string',
            'plantilla' => 'nullable|string',
            'datos' => 'nullable|json',
        ]);
        $notificacion->update($validated);
        return response()->json($notificacion);
    }

    // Eliminar una notificación
    public function destroy($id)
    {
        $notificacion = Notificacion::findOrFail($id);
        $notificacion->delete();
        return response()->json(['message' => 'Notificación eliminada']);
    }
}
