<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('servicios', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->text('descripcion')->nullable();
            $table->decimal('precio', 10, 2)->nullable();
            $table->enum('estado', ['activo', 'inactivo'])->default('activo');
            $table->enum('tipo', ['servicio', 'paquete'])->default('servicio');
            $table->string('categoria')->nullable();
            $table->string('subdominio')->nullable();
            $table->enum('estado_proyecto', ['en proceso', 'revisión', 'entregado', 'pausado', 'bloqueado'])->default('en proceso');
            $table->uuid('uuid')->unique();
            // Relación muchos a muchos para servicios en un paquete
            $table->json('servicios_incluidos')->nullable(); // IDs de servicios incluidos en el paquete
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('servicios');
    }
};
