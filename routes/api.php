<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware(['auth:api'])->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::put('/profile', [AuthController::class, 'updateProfile']);
});
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);
Route::post('/admins', [AuthController::class, 'createAdmin']);
Route::post('/users/sync-rol', [App\Http\Controllers\AuthController::class, 'syncAdminRole']);
Route::delete('/users/{id}', [App\Http\Controllers\AuthController::class, 'destroy']);
Route::put('/users/{id}', [AuthController::class, 'updateUserFromService']);
