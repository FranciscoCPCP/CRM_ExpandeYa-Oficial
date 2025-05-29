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
        Schema::create('pagos', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->unsignedBigInteger('cliente_id');
            $table->unsignedBigInteger('servicio_id');
            $table->decimal('monto', 10, 2);
            $table->enum('metodo', ['yape', 'plin', 'transferencia', 'paypal']);
            $table->string('comprobante')->nullable(); // ruta o nombre del archivo
            $table->enum('estado', ['activado', 'temporal', 'no pagado', 'cancelado'])->default('no pagado');
            $table->enum('tipo_pago', ['unico', 'en partes'])->default('unico');
            $table->date('fecha_pago')->nullable();
            $table->date('fecha_vencimiento')->nullable();
            $table->string('factura_pdf')->nullable(); // ruta o nombre del archivo
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pagos');
    }
};
