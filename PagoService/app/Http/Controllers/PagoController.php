<?php

namespace App\Http\Controllers;

use App\Models\Pago;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PagoController extends Controller
{
    // Listar todos los pagos
    public function index()
    {
        return response()->json(Pago::all());
    }

    // Crear un nuevo pago
    public function store(Request $request)
    {
        $validated = $request->validate([
            'uuid' => 'required|uuid|unique:pagos,uuid',
            'cliente_id' => 'required|integer',
            'servicio_id' => 'required|integer',
            'monto' => 'required|numeric',
            'metodo' => 'required|in:yape,plin,transferencia,paypal',
            'comprobante' => 'nullable|string',
            'estado' => 'nullable|in:activado,temporal,no pagado,cancelado',
            'tipo_pago' => 'nullable|in:unico,en partes',
            'fecha_pago' => 'nullable|date',
            'fecha_vencimiento' => 'nullable|date',
            'factura_pdf' => 'nullable|string',
        ]);
        $pago = Pago::create($validated);
        return response()->json($pago, 201);
    }

    // Mostrar un pago específico
    public function show($id)
    {
        $pago = Pago::findOrFail($id);
        return response()->json($pago);
    }

    // Actualizar un pago
    public function update(Request $request, $id)
    {
        $pago = Pago::findOrFail($id);
        $validated = $request->validate([
            'uuid' => 'sometimes|required|uuid|unique:pagos,uuid,' . $id,
            'cliente_id' => 'sometimes|required|integer',
            'servicio_id' => 'sometimes|required|integer',
            'monto' => 'sometimes|required|numeric',
            'metodo' => 'sometimes|required|in:yape,plin,transferencia,paypal',
            'comprobante' => 'nullable|string',
            'estado' => 'nullable|in:activado,temporal,no pagado,cancelado',
            'tipo_pago' => 'nullable|in:unico,en partes',
            'fecha_pago' => 'nullable|date',
            'fecha_vencimiento' => 'nullable|date',
            'factura_pdf' => 'nullable|string',
        ]);
        $pago->update($validated);
        return response()->json($pago);
    }

    // Eliminar un pago
    /*public function destroy($id)
    {
        $pago = Pago::findOrFail($id);
        $pago->delete();
        return response()->json(['message' => 'Pago eliminado']);
    }*/

    // Generar/descargar factura PDF (simulado)
    public function factura($uuid)
    {
        $pago = Pago::where('uuid', $uuid)->first();
        if (!$pago) {
            return response()->json(['message' => 'Pago no encontrado'], 404);
        }
        // Simulación: generar un PDF simple (en real usarías dompdf/barryvdh/laravel-dompdf)
        $pdfContent = "Factura de Pago\n\nID: {$pago->id}\nCliente: {$pago->cliente_id}\nServicio: {$pago->servicio_id}\nMonto: S/. {$pago->monto}\nMétodo: {$pago->metodo}\nEstado: {$pago->estado}\nFecha: {$pago->created_at}";
        $filename = "factura_{$pago->uuid}.pdf";
        Storage::disk('local')->put($filename, $pdfContent);
        return response()->download(storage_path("app/{$filename}"), $filename, [
            'Content-Type' => 'application/pdf',
        ]);
    }

    // Envío de recordatorios automáticos (simulado)
    public function recordatorios()
    {
        // Simulación: retornar mensaje
        return response()->json(['message' => 'Recordatorios enviados (simulado)']);
    }
}
