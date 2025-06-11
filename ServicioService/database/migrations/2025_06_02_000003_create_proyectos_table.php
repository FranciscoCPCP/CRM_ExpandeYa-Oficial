<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('proyectos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('paquete_id'); // Relación lógica, no FK estricta
            $table->unsignedBigInteger('cliente_id'); // Relación lógica, no FK estricta
            $table->json('servicios'); // Array de UUIDs de servicios en el proyecto
            $table->string('nombre');
            $table->enum('estado', ['pendiente', 'en_progreso', 'finalizado', 'entregado'])->default('pendiente');
            $table->text('notas')->nullable();
            $table->uuid('uuid')->unique();
            $table->timestamps();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('proyectos');
    }
};
