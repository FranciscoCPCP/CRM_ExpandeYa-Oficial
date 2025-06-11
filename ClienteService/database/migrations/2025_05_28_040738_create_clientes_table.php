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
        Schema::create('clientes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('nombre');
            $table->string('email')->unique();
            $table->string('telefono', 15); // Ahora obligatorio
            $table->string('direccion')->nullable(); // Ahora opcional
            $table->string('tipo_cliente'); // profesional, negocio, emprendimiento
            $table->string('actividad')->nullable(); // ahora opcional
            $table->string('nombre_negocio')->nullable(); // ahora opcional
            $table->string('idea_emprendimiento')->nullable(); // ahora opcional
            $table->string('region');
            $table->string('distrito');
            $table->string('provincia');
            $table->date('fecha_nacimiento')->nullable();
            $table->timestamp('fecha_registro')->useCurrent();
            $table->string('rol')->default('cliente'); // Nuevo campo para sincronizar el rol
            $table->timestamps();
            // Relación lógica, no FK real si usas bases separadas
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clientes');
    }
};
