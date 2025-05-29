<?php

use App\Http\Controllers\ReporteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/reportes/kpis', [ReporteController::class, 'kpis']);
Route::get('/reportes/ingresos-mes', [ReporteController::class, 'ingresosPorMes']);
Route::get('/reportes/citas-estado', [ReporteController::class, 'citasPorEstado']);
Route::get('/reportes/tickets-estado', [ReporteController::class, 'ticketsPorEstado']);
Route::get('/reportes/servicios-populares', [ReporteController::class, 'serviciosPopulares']);
