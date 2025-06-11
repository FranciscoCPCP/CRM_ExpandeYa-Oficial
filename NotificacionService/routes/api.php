<?php

use App\Http\Controllers\NotificacionController;
use App\Http\Controllers\PlantillaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/notificaciones', [NotificacionController::class, 'index']);
Route::post('/notificaciones', [NotificacionController::class, 'store']);
Route::get('/notificaciones/{id}', [NotificacionController::class, 'show']);
Route::put('/notificaciones/{id}', [NotificacionController::class, 'update']);
//Route::delete('/notificaciones/{id}', [NotificacionController::class, 'destroy']);

Route::get('/plantillas', [PlantillaController::class, 'index']);
Route::post('/plantillas', [PlantillaController::class, 'store']);
Route::get('/plantillas/{id}', [PlantillaController::class, 'show']);
Route::put('/plantillas/{id}', [PlantillaController::class, 'update']);
//Route::delete('/plantillas/{id}', [PlantillaController::class, 'destroy']);
