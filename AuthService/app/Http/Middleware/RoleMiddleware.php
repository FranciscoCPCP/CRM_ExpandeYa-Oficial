<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, ...$roles)
    {
        $user = JWTAuth::parseToken()->authenticate();
        if (!in_array($user->rol ?? $user->tipo ?? null, $roles)) {
            return response()->json(['error' => 'No autorizado'], 403);
        }
        return $next($request);
    }
}
