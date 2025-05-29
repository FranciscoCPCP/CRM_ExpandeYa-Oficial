<?php

use App\Http\Controllers\AdminController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Endpoints CRUD para administradores
Route::get('/administrador', [AdminController::class, 'index']);
Route::post('/administrador', [AdminController::class, 'store']);
Route::get('/administrador/{id}', [AdminController::class, 'show']);
Route::put('/administrador/{id}', [AdminController::class, 'update']);
//Route::delete('/administrador/{id}', [AdminController::class, 'destroy']);

// Endpoint para sincronización desde AuthService
Route::post('/admins/sync', [AdminController::class, 'syncFromAuth']);
