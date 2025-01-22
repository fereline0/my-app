<?php

namespace App\Http\Controllers;

use App\Http\Requests\RequestRequest;
use App\Http\Requests\RequestStatusRequest;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Models\Request as UserRequest;
use App\Models\Status;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Carbon\Carbon;

class RequestController extends Controller
{
    public function create()
    {
        $categories = Category::all();

        return Inertia::render('Requests/Create', [
            'categories' => $categories,
        ]);
    }

    public function show(Request $request, $id)
    {
        $userRequest = UserRequest::with('status', 'category', 'user')->findOrFail($id);

        $comments = $userRequest->comments()->with('user')->paginate(20);

        $statuses = Status::all();

        $permissions = $request->user()->getAllPermissions()->pluck('name')->toArray();

        return Inertia::render('Requests/Show', [
            'request' => $userRequest,
            'statuses' => $statuses,
            'comments' => $comments,
            'permissions' => $permissions,
        ]);
    }

    public function store(RequestRequest $request)
    {
        $validatedData = $request->validated();

        $status = Status::where('name', 'Открыто')->first();

        if (!$status) {
            return Redirect::route('requests.create');
        }

        $request = UserRequest::create([
            'user_id' => Auth::id(),
            'title' => $validatedData['title'],
            'value' => $validatedData['value'],
            'status_id' => $status->id,
            'category_id' => $validatedData['category_id']
        ]);

        return Redirect::route('requests.show', $request->id);
    }

    public function updateStatus(RequestStatusRequest $request, $id)
    {
        $validatedData = $request->validated();

        $userRequest = UserRequest::findOrFail($id);
        $userRequest->status_id = $validatedData['status_id'];
        $userRequest->save();

        return Redirect::route('requests.show', $id);
    }

    public function edit($id)
    {
        $request = UserRequest::with('category')->findOrFail($id);
        $categories = Category::all();

        return Inertia::render('Requests/Edit', [
            'request' => $request,
            'categories' => $categories,
        ]);
    }

    public function update(RequestRequest $request, $id)
    {
        $validatedData = $request->validated();

        $requestToUpdate = UserRequest::findOrFail($id);
        $requestToUpdate->update([
            'title' => $validatedData['title'],
            'value' => $validatedData['value'],
            'category_id' => $validatedData['category_id'],
        ]);

        return Redirect::route('requests.show', $id);
    }

    public function index(Request $request)
    {
        $permissions = $request->user()->getAllPermissions()->pluck('name')->toArray();
        $query = $request->input('search');
        $statusId = $request->input('status');
        $categoryId = $request->input('category');
        $month = 6;

        $requests = UserRequest::with('status', 'category', 'user')
            ->when($query, function ($queryBuilder) use ($query) {
                return $queryBuilder->where('title', 'like', "%{$query}%")
                    ->orWhere('value', 'like', "%{$query}%");
            })
            ->when($statusId && $statusId !== 'all', function ($queryBuilder) use ($statusId) {
                return $queryBuilder->where('status_id', $statusId);
            })
            ->when($categoryId && $categoryId !== 'all', function ($queryBuilder) use ($categoryId) {
                return $queryBuilder->where('category_id', $categoryId);
            })
            ->paginate(20);

        $requestsCount = UserRequest::selectRaw('DATE_FORMAT(created_at, "%Y-%m-01") as date, COUNT(*) as count')
            ->where('created_at', '>=', now()->subMonths($month))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        $monthlyRequests = [];
        for ($i = 0; $i < $month; $i++) {
            $date = now()->subMonths($i)->startOfMonth();

            $monthYear = $date->translatedFormat('F');

            $count = $requestsCount->where('date', $date->format('Y-m-d'))->first()->count ?? 0;

            $monthlyRequests[] = [
                'month' => $monthYear,
                'requestsCount' => $count,
            ];
        }

        $monthlyRequests = array_reverse($monthlyRequests);

        $statuses = Status::all();
        $categories = Category::all();

        return Inertia::render('Requests/Index', [
            'requests' => $requests,
            'statuses' => $statuses,
            'categories' => $categories,
            'monthlyRequests' => $monthlyRequests,
            'permissions' => $permissions,
        ]);
    }

    public function destroy($id)
    {
        $request = UserRequest::findOrFail($id);

        $request->delete();

        return Redirect::back();
    }
}
