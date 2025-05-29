<?php

use App\Http\Controllers\TicketController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Endpoints CRUD para tickets
Route::get('/tickets', [TicketController::class, 'index']);
Route::post('/tickets', [TicketController::class, 'store']);
Route::get('/tickets/{id}', [TicketController::class, 'show']);
Route::put('/tickets/{id}', [TicketController::class, 'update']);
//Route::delete('/tickets/{id}', [TicketController::class, 'destroy']);
// Endpoint para responder a un ticket (flujo de conversación)
Route::post('/tickets/{id}/respuesta', [TicketController::class, 'responder']);
