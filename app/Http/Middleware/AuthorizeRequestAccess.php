<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AuthorizeRequestAccess
{
    public function handle(Request $request, Closure $next, ...$permissions)
    {
        $requestId = $request->route('id');
        $user = $request->user();
        $userRequest = \App\Models\Request::findOrFail($requestId);

        if ($user->id === $userRequest->user_id || $user->hasAnyPermission($permissions)) {
            return $next($request);
        }

        return redirect()->route('index');
    }
}
