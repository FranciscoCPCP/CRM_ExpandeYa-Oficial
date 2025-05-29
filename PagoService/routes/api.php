<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PagoController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Endpoints CRUD para pagos
Route::get('/pagos', [PagoController::class, 'index']);
Route::post('/pagos', [PagoController::class, 'store']);
Route::get('/pagos/{id}', [PagoController::class, 'show']);
Route::put('/pagos/{id}', [PagoController::class, 'update']);
//Route::delete('/pagos/{id}', [PagoController::class, 'destroy']);

// Endpoints para facturas
Route::get('/facturas/{uuid}', [PagoController::class, 'factura']); // Generar/descargar factura PDF
Route::get('/recordatorios', [PagoController::class, 'recordatorios']); // Envío de recordatorios automáticos
