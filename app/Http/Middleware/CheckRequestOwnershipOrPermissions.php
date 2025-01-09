<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckRequestOwnershipOrPermissions
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  ...$permissions
     * @return mixed
     */
    public function handle(Request $request, Closure $next, ...$permissions)
    {
        $requestId = $request->route('id');
        $user = $request->user();
        $requestResource = \App\Models\Request::findOrFail($requestId);

        if ($user->id === $requestResource->user_id || $user->hasAnyPermission($permissions)) {
            return $next($request);
        }

        return redirect()->route('index');
    }
}
