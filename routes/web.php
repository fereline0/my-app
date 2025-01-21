<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RequestController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('', [HomeController::class, 'index'])->name('index');

    Route::get('profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::prefix('requests')->group(function () {
        Route::get('', [RequestController::class, 'index'])->name('requests.index')->middleware(['checkPermissions:edit request, edit request status, delete request']);;
        Route::get('create', [RequestController::class, 'create'])->name('requests.create');
        Route::post('', [RequestController::class, 'store'])->name('requests.store');

        Route::prefix('{id}')->group(function () {
            Route::post('status', [RequestController::class, 'updateStatus'])->name('requests.updateStatus')->middleware('checkRequestOwnershipOrPermissions:edit request status');

            Route::get('edit', [RequestController::class, 'edit'])
                ->name('requests.edit')
                ->middleware('checkRequestOwnershipOrPermissions:edit request');

            Route::put('', [RequestController::class, 'update'])
                ->name('requests.update')
                ->middleware('checkRequestOwnershipOrPermissions:edit request');

            Route::get('', [RequestController::class, 'show'])
                ->name('requests.show')
                ->middleware('checkRequestOwnershipOrPermissions:edit request, edit request status, delete request');

            Route::delete('', [RequestController::class, 'destroy'])
                ->name('requests.destroy')
                ->middleware('checkRequestOwnershipOrPermissions:delete request');
        });
    });

    Route::prefix('comments')->group(function () {
        Route::post('', [CommentController::class, 'store'])->name('comments.store');
        Route::prefix('{id}')->middleware('checkCommentOwnership')->group(function () {
            Route::get('edit', [CommentController::class, 'edit'])->name('comments.edit');
            Route::put('', [CommentController::class, 'update'])->name('comments.update');
            Route::delete('', [CommentController::class, 'destroy'])->name('comments.destroy');
        });
    });
});

require __DIR__ . '/auth.php';
