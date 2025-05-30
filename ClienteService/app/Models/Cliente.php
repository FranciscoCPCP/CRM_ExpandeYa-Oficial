<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    protected $fillable = [
        'nombre',
        'email',
        'telefono',
        'direccion',
        'fecha_nacimiento',
        'fecha_registro',
        'user_id',
        'tipo_cliente', // profesional, negocio, emprendimiento
        'actividad', // a qué se dedica (profesional)
        'nombre_negocio', // nombre de empresa/negocio
        'idea_emprendimiento', // idea de emprendimiento
        'region',
        'distrito',
        'provincia',
        'rol', // Nuevo campo para sincronizar el rol
    ];
}
