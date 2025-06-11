<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Paquete extends Model
{
    protected $fillable = [
        'cliente_id',
        'nombre',
        'servicios', // json: array de UUIDs de servicios
        'estado',
        'notas', // nullable
        'uuid',
    ];
    protected $casts = [
        'servicios' => 'array',
    ];
    public function cliente()
    {
        return $this->belongsTo(\App\Models\Cliente::class, 'cliente_id');
    }
    public function proyectos()
    {
        return $this->hasMany(Proyecto::class, 'paquete_id');
    }
}
