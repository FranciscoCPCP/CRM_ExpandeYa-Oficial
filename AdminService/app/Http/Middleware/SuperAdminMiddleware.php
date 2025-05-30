<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class SuperAdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $user = JWTAuth::parseToken()->authenticate();
        if (($user->rol ?? $user->role ?? null) !== 'superadmin') {
            return response()->json(['error' => 'No autorizado. Solo el superadmin puede acceder.'], 403);
        }
        return $next($request);
    }
}
