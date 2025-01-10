<?php

namespace App\Http\Controllers;

use App\Http\Requests\CommentStoreRequest;
use App\Http\Requests\CommentUpdateRequest;
use App\Models\Comment;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;

class CommentController extends Controller
{
    public function store(CommentStoreRequest $request)
    {
        Comment::create([
            'request_id' => $request->request_id,
            'user_id' => Auth::id(),
            'value' => $request->value,
        ]);

        return Redirect::back();
    }

    public function edit($id)
    {
        $comment = Comment::findOrFail($id);

        return Inertia::render('Comments/Edit', [
            'comment' => $comment,
        ]);
    }

    public function update(CommentUpdateRequest $request, $id)
    {
        $comment = Comment::findOrFail($id);

        $comment->update([
            'value' => $request->value,
        ]);

        return Redirect::back();
    }

    public function destroy($id)
    {
        $comment = Comment::findOrFail($id);
        $comment->delete();

        return Redirect::back();
    }
}
