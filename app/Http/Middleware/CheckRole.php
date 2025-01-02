<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    public function handle(Request $request, Closure $next, $role)
    {
        $userRole = Auth::user()->role;

        if (!$userRole || $userRole !== $role) {
            abort(403, 'Unauthorized action.');
        }

        return $next($request);
    }
}
