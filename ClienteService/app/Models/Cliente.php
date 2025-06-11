<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    protected $fillable = [
        'nombre',
        'email',
        'telefono',
        'direccion', // ya está en fillable y Laravel maneja nullable automáticamente
        'fecha_nacimiento',
        'fecha_registro',
        'user_id',
        'tipo_cliente', // profesional, negocio, emprendimiento
        'actividad', // obligatorio
        'nombre_negocio', // obligatorio
        'idea_emprendimiento', // obligatorio
        'region',
        'distrito',
        'provincia',
        'rol', // Nuevo campo para sincronizar el rol
    ];
}
