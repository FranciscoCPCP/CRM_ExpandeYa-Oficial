<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Servicio extends Model
{
    protected $fillable = [
        'nombre',
        'descripcion',
        'precio',
        'estado',
        'tipo',
        'categoria',
        'subdominio',
        'estado_proyecto',
        'uuid',
        'servicios_incluidos',
    ];
}
