<?php

namespace App\Http\Middleware;

use Closure;
use Log;
use Illuminate\Support\Facades\Auth;

class AdminRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $user = Auth::user();
        if ($user->type != 'adm') {
            return response('User type unauthorized.',400);
        }
        return $next($request);
    }
}
