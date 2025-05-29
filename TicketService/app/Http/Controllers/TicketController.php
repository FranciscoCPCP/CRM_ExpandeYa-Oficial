<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Models\TicketRespuesta;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    // Listar todos los tickets
    public function index()
    {
        return response()->json(Ticket::all());
    }

    // Crear un nuevo ticket
    public function store(Request $request)
    {
        $validated = $request->validate([
            'cliente_id' => 'required|integer',
            'admin_id' => 'nullable|integer',
            'asunto' => 'required|string|max:255',
            'mensaje' => 'required|string',
            'estado' => 'nullable|in:abierto,en revisión,resuelto',
            'adjuntos' => 'nullable|json',
        ]);
        $ticket = Ticket::create($validated);
        // Registrar el primer mensaje como respuesta
        TicketRespuesta::create([
            'ticket_id' => $ticket->id,
            'user_id' => $ticket->cliente_id,
            'user_type' => 'cliente',
            'mensaje' => $ticket->mensaje,
            'adjuntos' => $ticket->adjuntos,
        ]);
        return response()->json($ticket, 201);
    }

    // Mostrar un ticket específico
    public function show($id)
    {
        $ticket = Ticket::with('respuestas')->findOrFail($id);
        return response()->json($ticket);
    }

    // Actualizar un ticket
    public function update(Request $request, $id)
    {
        $ticket = Ticket::findOrFail($id);
        $validated = $request->validate([
            'asunto' => 'sometimes|required|string|max:255',
            'estado' => 'nullable|in:abierto,en revisión,resuelto',
            'admin_id' => 'nullable|integer',
            'adjuntos' => 'nullable|json',
        ]);
        $ticket->update($validated);
        return response()->json($ticket);
    }

    // Eliminar un ticket
    /*public function destroy($id)
    {
        $ticket = Ticket::findOrFail($id);
        $ticket->delete();
        return response()->json(['message' => 'Ticket eliminado']);
    }*/

    // Registrar una respuesta en el flujo de conversación
    public function responder(Request $request, $id)
    {
        $ticket = Ticket::findOrFail($id);
        $validated = $request->validate([
            'user_id' => 'required|integer',
            'user_type' => 'required|in:cliente,admin',
            'mensaje' => 'required|string',
            'adjuntos' => 'nullable|json',
        ]);
        $respuesta = TicketRespuesta::create([
            'ticket_id' => $ticket->id,
            'user_id' => $validated['user_id'],
            'user_type' => $validated['user_type'],
            'mensaje' => $validated['mensaje'],
            'adjuntos' => $validated['adjuntos'] ?? null,
        ]);
        return response()->json($respuesta, 201);
    }
}
