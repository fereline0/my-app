<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Request;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    public function index()
    {
        $requests = Request::with('status', 'category')
            ->where('user_id', Auth::id())
            ->paginate(20);

        return Inertia::render('Index', [
            'requests' => $requests,
        ]);
    }
}
