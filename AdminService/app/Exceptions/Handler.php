<?php

namespace App\Exceptions;

use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{
    protected function unauthenticated($request, AuthenticationException $exception)
    {
        // Siempre devolver JSON para APIs
        return response()->json(['message' => 'No autenticado. Token JWT inválido o ausente.'], 401);
    }
}
