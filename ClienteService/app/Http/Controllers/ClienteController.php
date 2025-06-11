<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Helpers\UbigeoPeru;

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
        $baseRules = [
            'nombre' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:clientes,email',
            'telefono' => 'required|string|max:15',
            'direccion' => 'nullable|string|max:255',
            'region' => 'required|string|max:100',
            'distrito' => 'required|string|max:100',
            'provincia' => 'required|string|max:100',
            'tipo_cliente' => 'required|in:profesional,negocio,emprendimiento',
            'fecha_nacimiento' => 'required|date|before:-18 years',
            'rol' => 'sometimes|string|max:20',
            'user_id' => 'nullable|integer',
        ];
        // Validación dinámica según tipo_cliente
        $tipo = $request->input('tipo_cliente');
        if ($tipo === 'profesional') {
            $baseRules['actividad'] = 'required|string|max:255';
            $baseRules['nombre_negocio'] = 'nullable|string|max:255';
            $baseRules['idea_emprendimiento'] = 'nullable|string|max:255';
        } elseif ($tipo === 'negocio') {
            $baseRules['actividad'] = 'nullable|string|max:255';
            $baseRules['nombre_negocio'] = 'required|string|max:255';
            $baseRules['idea_emprendimiento'] = 'nullable|string|max:255';
        } elseif ($tipo === 'emprendimiento') {
            $baseRules['actividad'] = 'nullable|string|max:255';
            $baseRules['nombre_negocio'] = 'nullable|string|max:255';
            $baseRules['idea_emprendimiento'] = 'required|string|max:255';
        } else {
            $baseRules['actividad'] = 'nullable|string|max:255';
            $baseRules['nombre_negocio'] = 'nullable|string|max:255';
            $baseRules['idea_emprendimiento'] = 'nullable|string|max:255';
        }
        $validated = $request->validate($baseRules);
        // Validar ubigeo Perú
        if (!UbigeoPeru::isValid($validated['region'], $validated['provincia'], $validated['distrito'])) {
            return response()->json(['error' => 'Ubicación (región/provincia/distrito) no válida para Perú'], 422);
        }
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
        $baseRules = [
            'nombre' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|max:255|unique:clientes,email,' . $id,
            'telefono' => 'sometimes|required|string|max:15',
            'direccion' => 'nullable|string|max:255',
            'region' => 'required|string|max:100',
            'distrito' => 'required|string|max:100',
            'provincia' => 'required|string|max:100',
            'tipo_cliente' => 'required|in:profesional,negocio,emprendimiento',
            'fecha_nacimiento' => 'nullable|date',
            'rol' => 'sometimes|string|max:20',
            'user_id' => 'nullable|integer',
        ];
        $tipo = $request->input('tipo_cliente', $cliente->tipo_cliente);
        if ($tipo === 'profesional') {
            $baseRules['actividad'] = 'required|string|max:255';
            $baseRules['nombre_negocio'] = 'nullable|string|max:255';
            $baseRules['idea_emprendimiento'] = 'nullable|string|max:255';
        } elseif ($tipo === 'negocio') {
            $baseRules['actividad'] = 'nullable|string|max:255';
            $baseRules['nombre_negocio'] = 'required|string|max:255';
            $baseRules['idea_emprendimiento'] = 'nullable|string|max:255';
        } elseif ($tipo === 'emprendimiento') {
            $baseRules['actividad'] = 'nullable|string|max:255';
            $baseRules['nombre_negocio'] = 'nullable|string|max:255';
            $baseRules['idea_emprendimiento'] = 'required|string|max:255';
        } else {
            $baseRules['actividad'] = 'nullable|string|max:255';
            $baseRules['nombre_negocio'] = 'nullable|string|max:255';
            $baseRules['idea_emprendimiento'] = 'nullable|string|max:255';
        }
        $validated = $request->validate($baseRules);
        if (!UbigeoPeru::isValid($validated['region'], $validated['provincia'], $validated['distrito'])) {
            return response()->json(['error' => 'Ubicación (región/provincia/distrito) no válida para Perú'], 422);
        }
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
            'nombre' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'telefono' => 'required|string|max:15',
            'direccion' => 'nullable|string|max:255',
            'region' => 'required|string|max:100',
            'distrito' => 'required|string|max:100',
            'provincia' => 'required|string|max:100',
            'tipo_cliente' => 'required|in:profesional,negocio,emprendimiento',
            'actividad' => 'nullable|string|max:255',
            'nombre_negocio' => 'nullable|string|max:255',
            'idea_emprendimiento' => 'nullable|string|max:255',
            'fecha_nacimiento' => 'nullable|date',
            'rol' => 'sometimes|string|max:20'
        ]);
        if (!UbigeoPeru::isValid($validated['region'], $validated['provincia'], $validated['distrito'])) {
            return response()->json(['error' => 'Ubicación (región/provincia/distrito) no válida para Perú'], 422);
        }
        $validated['fecha_registro'] = now();
        $cliente = Cliente::updateOrCreate(
            ['user_id' => $validated['user_id']],
            [
                'nombre' => $validated['nombre'],
                'email' => $validated['email'],
                'telefono' => $validated['telefono'],
                'direccion' => $validated['direccion'] ?? null,
                'tipo_cliente' => $validated['tipo_cliente'],
                'actividad' => $validated['actividad'] ?? null,
                'nombre_negocio' => $validated['nombre_negocio'] ?? null,
                'idea_emprendimiento' => $validated['idea_emprendimiento'] ?? null,
                'region' => $validated['region'],
                'distrito' => $validated['distrito'],
                'provincia' => $validated['provincia'],
                'fecha_nacimiento' => $validated['fecha_nacimiento'] ?? null,
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

    // Endpoint para exponer el ubigeo completo a frontend
    public function ubigeo()
    {
        // Convertir la estructura asociativa a la estructura esperada por el frontend
        $data = [];
        foreach (\App\Helpers\UbigeoPeru::$data as $region => $provincias) {
            $provArr = [];
            foreach ($provincias as $provincia => $distritos) {
                $provArr[] = [
                    'provincia' => $provincia,
                    'distritos' => array_values($distritos),
                ];
            }
            $data[] = [
                'region' => $region,
                'provincias' => $provArr,
            ];
        }
        return response()->json($data);
    }
}
