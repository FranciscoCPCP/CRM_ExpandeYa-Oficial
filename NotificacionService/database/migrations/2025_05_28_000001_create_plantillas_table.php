<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('plantillas', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('canal'); // email, whatsapp, sms, push
            $table->string('asunto')->nullable(); // para email
            $table->text('contenido'); // cuerpo de la plantilla
            $table->json('variables')->nullable(); // variables dinámicas
            $table->string('estado')->default('activa');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('plantillas');
    }
};
