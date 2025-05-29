<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cita extends Model
{
    protected $fillable = [
        'nombre',
        'razon_social',
        'telefono',
        'email',
        'motivo',
        'medio',
        'estado',
        'fecha_cita',
        'notas',
    ];
}
