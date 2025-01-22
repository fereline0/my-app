<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $query = $request->input('search');
        $permissions = $request->user()->getAllPermissions()->pluck('name')->toArray();

        $categories = Category::when($query, function ($queryBuilder) use ($query) {
            return $queryBuilder->where('name', 'like', "%{$query}%");
        })
            ->paginate(20);

        return Inertia::render('Categories/Index', [
            'categories' => $categories,
            'permissions' => $permissions,
        ]);
    }

    public function create(Request $request)
    {
        $permissions = $request->user()->getAllPermissions()->pluck('name')->toArray();

        return Inertia::render('Categories/Create', [
            'permissions' => $permissions,
        ]);
    }

    public function store(CategoryRequest $request)
    {
        $validatedData = $request->validated();
        Category::create($validatedData);

        return Redirect::route('dashboard.categories.index');
    }

    public function edit(Request $request, $id)
    {
        $permissions = $request->user()->getAllPermissions()->pluck('name')->toArray();
        $category = Category::findOrFail($id);

        return Inertia::render('Categories/Edit', [
            'category' => $category,
            'permissions' => $permissions,
        ]);
    }

    public function update(CategoryRequest $request, $id)
    {
        $validatedData = $request->validated();
        $category = Category::findOrFail($id);
        $category->update($validatedData);

        return Redirect::route('dashboard.categories.index');
    }

    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();

        return Redirect::route('dashboard.categories.index');
    }
}
