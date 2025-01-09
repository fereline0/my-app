<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckCommentOwnership
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $commentId = $request->route('id');
        $user = Auth::user();
        $commentResource = \App\Models\Comment::findOrFail($commentId);

        if ($user->id === $commentResource->user_id) {
            return $next($request);
        }

        return redirect()->route('index');
    }
}
