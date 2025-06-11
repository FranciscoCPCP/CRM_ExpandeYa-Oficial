<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ServicioController;
use App\Http\Controllers\PaqueteController;
use App\Http\Controllers\ProyectoController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\SubcategoriaController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Endpoints CRUD para servicios
Route::get('/servicios', [ServicioController::class, 'index']);
Route::get('/servicios/{id}', [ServicioController::class, 'show']);
Route::post('/servicios', [ServicioController::class, 'store']);
Route::put('/servicios/{id}', [ServicioController::class, 'update']);
Route::delete('/servicios/{id}', [ServicioController::class, 'destroy']);
// Endpoint para sincronización con otros microservicios
Route::post('/servicios/sync', [ServicioController::class, 'sync']);

// Endpoints para paquetes
Route::get('/paquetes', [PaqueteController::class, 'index']); // admin/superadmin
Route::get('/paquetes/cliente/{cliente_id}', [PaqueteController::class, 'paquetesCliente']); // admin/superadmin/cliente
Route::post('/paquetes', [PaqueteController::class, 'store']); // cliente
Route::get('/paquetes/{id}', [PaqueteController::class, 'show']); // admin/superadmin/cliente dueño
Route::put('/paquetes/{id}', [PaqueteController::class, 'update']); // admin/superadmin

// Endpoints para proyectos
Route::get('/proyectos', [ProyectoController::class, 'index']); // admin/superadmin
Route::get('/proyectos/paquete/{paquete_id}', [ProyectoController::class, 'proyectosPaquete']); // admin/superadmin/cliente
Route::post('/proyectos', [ProyectoController::class, 'store']); // admin/superadmin
Route::get('/proyectos/{id}', [ProyectoController::class, 'show']); // admin/superadmin/cliente
Route::put('/proyectos/{id}', [ProyectoController::class, 'update']); // admin/superadmin

// CRUD Categorías
Route::get('/categorias', [CategoriaController::class, 'index']);
Route::post('/categorias', [CategoriaController::class, 'store']);
Route::put('/categorias/{id}', [CategoriaController::class, 'update']);
Route::delete('/categorias/{id}', [CategoriaController::class, 'destroy']);
// CRUD Subcategorías
Route::get('/subcategorias', [SubcategoriaController::class, 'index']);
Route::post('/subcategorias', [SubcategoriaController::class, 'store']);
Route::put('/subcategorias/{id}', [SubcategoriaController::class, 'update']);
Route::delete('/subcategorias/{id}', [SubcategoriaController::class, 'destroy']);
