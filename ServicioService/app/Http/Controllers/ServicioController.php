<?php

namespace App\Http\Controllers;

use App\Models\Servicio;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ServicioController extends Controller
{
    // Listar todos los servicios y paquetes
    public function index()
    {
        return response()->json(Servicio::all());
    }

    // Crear un nuevo servicio o paquete
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'precio' => 'nullable|numeric',
            'estado' => 'required|in:activo,inactivo',
            'tipo' => 'required|in:servicio,paquete',
            'categoria' => 'nullable|string|max:255',
            'subdominio' => 'nullable|string|max:255',
            'estado_proyecto' => 'required|in:en proceso,revisión,entregado,pausado,bloqueado',
            'uuid' => 'required|uuid|unique:servicios,uuid',
            'servicios_incluidos' => 'nullable|json',
        ]);
        $servicio = Servicio::create($validated);
        return response()->json($servicio, 201);
    }

    // Mostrar un servicio o paquete específico
    public function show($id)
    {
        $servicio = Servicio::findOrFail($id);
        return response()->json($servicio);
    }

    // Actualizar un servicio o paquete
    public function update(Request $request, $id)
    {
        $servicio = Servicio::findOrFail($id);
        $validated = $request->validate([
            'nombre' => 'sometimes|required|string|max:255',
            'descripcion' => 'nullable|string',
            'precio' => 'nullable|numeric',
            'estado' => 'sometimes|required|in:activo,inactivo',
            'tipo' => 'sometimes|required|in:servicio,paquete',
            'categoria' => 'nullable|string|max:255',
            'subdominio' => 'nullable|string|max:255',
            'estado_proyecto' => 'sometimes|required|in:en proceso,revisión,entregado,pausado,bloqueado',
            'uuid' => 'sometimes|required|uuid|unique:servicios,uuid,' . $id,
            'servicios_incluidos' => 'nullable|json',
        ]);
        $servicio->update($validated);
        return response()->json($servicio);
    }

    // Eliminar un servicio o paquete
    public function destroy($id)
    {
        $servicio = Servicio::findOrFail($id);
        $servicio->delete();
        return response()->json(['message' => 'Servicio eliminado']);
    }

    // Listar solo paquetes
    public function paquetes()
    {
        $paquetes = Servicio::where('tipo', 'paquete')->get();
        return response()->json($paquetes);
    }

    // Crear un paquete personalizado (carrito de servicios)
    public function crearPaquetePersonalizado(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'precio' => 'required|numeric',
            'servicios_incluidos' => 'required|array|min:1', // IDs de servicios
        ]);
        $paquete = Servicio::create([
            'nombre' => $validated['nombre'],
            'descripcion' => $validated['descripcion'] ?? null,
            'precio' => $validated['precio'],
            'estado' => 'activo',
            'tipo' => 'paquete',
            'categoria' => 'personalizado',
            'subdominio' => null,
            'estado_proyecto' => 'en proceso',
            'uuid' => Str::uuid(),
            'servicios_incluidos' => json_encode($validated['servicios_incluidos']),
        ]);
        return response()->json($paquete, 201);
    }
}
