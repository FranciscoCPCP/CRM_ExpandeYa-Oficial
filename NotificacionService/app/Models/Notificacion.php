<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notificacion extends Model
{
    protected $fillable = [
        'titulo',
        'mensaje',
        'tipo', // info, alerta, recordatorio, etc.
        'user_id', // destinatario
        'canal', // email, whatsapp, sms, push
        'estado', // pendiente, enviada, fallida
        'plantilla', // nombre de plantilla usada
        'datos', // json con datos dinámicos
    ];
}
