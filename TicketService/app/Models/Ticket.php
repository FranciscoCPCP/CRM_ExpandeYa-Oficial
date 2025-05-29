<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    public function respuestas()
    {
        return $this->hasMany(TicketRespuesta::class, 'ticket_id');
    }
}
