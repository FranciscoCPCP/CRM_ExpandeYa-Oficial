<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ServicioController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Endpoints CRUD para servicios y paquetes
Route::get('/servicios', [ServicioController::class, 'index']);
Route::post('/servicios', [ServicioController::class, 'store']);
Route::get('/servicios/{id}', [ServicioController::class, 'show']);
Route::put('/servicios/{id}', [ServicioController::class, 'update']);
Route::delete('/servicios/{id}', [ServicioController::class, 'destroy']);

// Endpoint para listar solo paquetes
Route::get('/paquetes', [ServicioController::class, 'paquetes']);
// Endpoint para crear un paquete personalizado (carrito de servicios)
Route::post('/paquetes', [ServicioController::class, 'crearPaquetePersonalizado']);
