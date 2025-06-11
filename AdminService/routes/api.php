<?php

use App\Http\Controllers\AdminController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Todos los admins (admin y superadmin) pueden ver la lista
Route::middleware(['auth:api'])->group(function () {
    Route::get('/administrador', [AdminController::class, 'index']);
    Route::get('/administrador/{id}', [AdminController::class, 'show']);
});
// Solo el superadmin puede crear, actualizar y eliminar
Route::middleware(['auth:api'])->group(function () {
    Route::post('/administrador', [AdminController::class, 'store']);
    Route::put('/administrador/{id}', [AdminController::class, 'update']);
    Route::delete('/administrador/{id}', [AdminController::class, 'destroy']);
});
// Endpoint para sincronización desde AuthService
Route::post('/administrador/sync', [AdminController::class, 'syncFromAuth']);
