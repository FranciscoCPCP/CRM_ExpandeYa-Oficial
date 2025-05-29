<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pago extends Model
{
    protected $fillable = [
        'uuid',
        'cliente_id',
        'servicio_id',
        'monto',
        'metodo',
        'comprobante',
        'estado',
        'tipo_pago',
        'fecha_pago',
        'fecha_vencimiento',
        'factura_pdf',
    ];
}
