<?php

namespace App\Http\Controllers;

use App\Http\Requests\StatusRequest;
use App\Models\Status;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;

class StatusController extends Controller
{
    public function index(Request $request)
    {
        $query = $request->input('search');
        $isClosed = $request->input('is_closed');
        $permissions = $request->user()->getAllPermissions()->pluck('name')->toArray();

        $statuses = Status::when($query, function ($queryBuilder) use ($query) {
            return $queryBuilder->where('name', 'like', "%{$query}%");
        })
            ->when($isClosed === '1', function ($queryBuilder) {
                return $queryBuilder->where('is_closed', true);
            })
            ->when($isClosed === '0', function ($queryBuilder) {
                return $queryBuilder->where('is_closed', false);
            })
            ->when($isClosed === 'all', function ($queryBuilder) {
                return $queryBuilder;
            })
            ->paginate(20);

        return Inertia::render('Statuses/Index', [
            'statuses' => $statuses,
            'permissions' => $permissions,
        ]);
    }

    public function create(Request $request)
    {
        $permissions = $request->user()->getAllPermissions()->pluck('name')->toArray();

        return Inertia::render('Statuses/Create', [
            'permissions' => $permissions,
        ]);
    }

    public function store(StatusRequest $request)
    {
        $validatedData = $request->validated();
        Status::create($validatedData);

        return Redirect::route('dashboard.statuses.index');
    }

    public function edit(Request $request, $id)
    {
        $permissions = $request->user()->getAllPermissions()->pluck('name')->toArray();
        $status = Status::findOrFail($id);

        return Inertia::render('Statuses/Edit', [
            'status' => $status,
            'permissions' => $permissions,
        ]);
    }

    public function update(StatusRequest $request, $id)
    {
        $validatedData = $request->validated();
        $status = Status::findOrFail($id);
        $status->update($validatedData);

        return Redirect::route('dashboard.statuses.index');
    }

    public function destroy($id)
    {
        $status = Status::findOrFail($id);
        $status->delete();

        return Redirect::route('dashboard.statuses.index');
    }
}
