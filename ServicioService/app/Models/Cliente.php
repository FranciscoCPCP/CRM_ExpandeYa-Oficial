<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'email',
        'telefono',
        // otros campos...
    ];

    public function paquetes()
    {
        return $this->hasMany(\App\Models\Paquete::class, 'cliente_id');
    }

    // otras relaciones y métodos...
}
