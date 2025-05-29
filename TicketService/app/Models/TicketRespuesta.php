<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TicketRespuesta extends Model
{
    protected $fillable = [
        'ticket_id',
        'user_id',
        'user_type',
        'mensaje',
        'adjuntos',
    ];
}
