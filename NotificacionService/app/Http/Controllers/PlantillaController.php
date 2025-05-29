<?php

namespace App\Http\Controllers;

use App\Models\Plantilla;
use Illuminate\Http\Request;

class PlantillaController extends Controller
{
    // Listar todas las plantillas
    public function index()
    {
        return response()->json(Plantilla::all());
    }

    // Crear una nueva plantilla
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'canal' => 'required|string',
            'asunto' => 'nullable|string',
            'contenido' => 'required|string',
            'variables' => 'nullable|json',
            'estado' => 'nullable|string',
        ]);
        $plantilla = Plantilla::create($validated);
        return response()->json($plantilla, 201);
    }

    // Mostrar una plantilla específica
    public function show($id)
    {
        $plantilla = Plantilla::findOrFail($id);
        return response()->json($plantilla);
    }

    // Actualizar una plantilla
    public function update(Request $request, $id)
    {
        $plantilla = Plantilla::findOrFail($id);
        $validated = $request->validate([
            'nombre' => 'sometimes|required|string|max:255',
            'canal' => 'sometimes|required|string',
            'asunto' => 'nullable|string',
            'contenido' => 'sometimes|required|string',
            'variables' => 'nullable|json',
            'estado' => 'nullable|string',
        ]);
        $plantilla->update($validated);
        return response()->json($plantilla);
    }

    // Eliminar una plantilla
    public function destroy($id)
    {
        $plantilla = Plantilla::findOrFail($id);
        $plantilla->delete();
        return response()->json(['message' => 'Plantilla eliminada']);
    }
}
