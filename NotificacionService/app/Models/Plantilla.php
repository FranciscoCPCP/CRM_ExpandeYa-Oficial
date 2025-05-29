<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Plantilla extends Model
{
    protected $fillable = [
        'nombre',
        'canal', // email, whatsapp, sms, push
        'asunto', // para email
        'contenido', // cuerpo de la plantilla, puede ser texto o HTML
        'variables', // json con variables dinámicas
        'estado', // activa, inactiva
    ];
}
