<?php

namespace App\Http\Controllers;

use App\Models\Cita;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CitaController extends Controller
{
    // Listar todas las citas
    public function index()
    {
        return response()->json(Cita::all());
    }

    // Crear una nueva cita
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'razon_social' => 'nullable|string|max:255',
            'telefono' => 'required|string|size:12',
            'email' => 'required|email|max:255',
            'motivo' => 'required|string',
            'medio' => 'required|in:presencial,virtual',
            'fecha_cita' => 'required|date',
            'notas' => 'nullable|string',
        ]);
        $cita = Cita::create($validated);
        return response()->json($cita, 201);
    }

    // Mostrar una cita específica
    public function show($id)
    {
        $cita = Cita::findOrFail($id);
        return response()->json($cita);
    }

    // Actualizar una cita
    public function update(Request $request, $id)
    {
        $cita = Cita::findOrFail($id);
        $validated = $request->validate([
            'nombre' => 'sometimes|required|string|max:255',
            'razon_social' => 'nullable|string|max:255',
            'telefono' => 'sometimes|required|string|size:12',
            'email' => 'sometimes|required|email|max:255',
            'motivo' => 'sometimes|required|string',
            'medio' => 'sometimes|required|in:presencial,virtual',
            'estado' => 'sometimes|required|in:pendiente,confirmada,atendida',
            'fecha_cita' => 'sometimes|required|date',
            'notas' => 'nullable|string',
        ]);
        $cita->update($validated);
        return response()->json($cita);
    }

    // Eliminar una cita
    /*public function destroy($id)
    {
        $cita = Cita::findOrFail($id);
        $cita->delete();
        return response()->json(['message' => 'Cita eliminada']);
    }*/
}
