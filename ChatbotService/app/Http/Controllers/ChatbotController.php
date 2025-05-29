<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ChatbotController extends Controller
{
    // Flujo de respuestas basado en palabras clave
    public function handle(Request $request)
    {
        $mensaje = strtolower($request->input('mensaje'));
        $respuesta = $this->responderPorFlujo($mensaje);
        return response()->json(['respuesta' => $respuesta]);
    }

    private function responderPorFlujo($mensaje)
    {
        // Palabras clave y respuestas personalizadas para Expande ¡Ya!
        $flujos = [
            'hola' => '¡Hola! ¿En qué puedo ayudarte? Puedes consultar sobre servicios, citas, pagos o soporte.',
            'servicio' => 'Ofrecemos desarrollo web, marketing digital, tiendas online y sistemas a medida. ¿Te gustaría más información de alguno?',
            'cita' => '¿Quieres agendar una cita? Puedes hacerlo desde nuestro formulario o escribiendo "reservar cita".',
            'pago' => 'Aceptamos Yape, Plin, transferencia y PayPal. ¿Sobre qué pago necesitas información?',
            'soporte' => '¿Tienes un problema? Puedes crear un ticket y nuestro equipo te ayudará.',
            'paquete' => 'Puedes armar un paquete personalizado de servicios. ¿Qué te gustaría incluir?',
            'factura' => 'Las facturas se envían automáticamente a tu email y WhatsApp tras el pago.',
            'contacto' => 'Puedes contactarnos por WhatsApp, email o desde el CRM.',
            'gracias' => '¡Gracias por comunicarte con Expande ¡Ya! Si tienes otra consulta, aquí estaré.',
            'adios' => '¡Hasta luego! Recuerda que puedes volver a escribirnos cuando quieras.'
        ];
        foreach ($flujos as $clave => $respuesta) {
            if (str_contains($mensaje, $clave)) {
                return $respuesta;
            }
        }
        return 'No entendí tu mensaje. ¿Puedes reformular tu consulta o elegir una opción del menú principal?';
    }
}
