<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Proyecto extends Model
{
    protected $fillable = [
        'paquete_id',
        'nombre',
        'estado',
        'notas', // nullable
        'uuid',
    ];

    public function paquete()
    {
        return $this->belongsTo(Paquete::class, 'paquete_id');
    }
}
