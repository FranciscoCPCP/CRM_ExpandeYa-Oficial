<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    protected $fillable = [
        'user_id',
        'nombre',
        'telefono',
        'direccion',
        'area',
        'rol', // Nuevo campo para sincronizar el rol
    ];
}
