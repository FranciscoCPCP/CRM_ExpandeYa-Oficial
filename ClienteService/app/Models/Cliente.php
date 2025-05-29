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
        'razon_social',
        'rol', // Nuevo campo para sincronizar el rol
    ];
}
