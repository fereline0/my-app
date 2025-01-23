<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RequestController;
use App\Http\Controllers\StatusController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('', [HomeController::class, 'index'])->name('index');

    Route::get('profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::prefix('requests')->name('requests.')->group(function () {
        Route::get('create', [RequestController::class, 'create'])->name('create');
        Route::post('', [RequestController::class, 'store'])->name('store');

        Route::prefix('{id}')->group(function () {
            Route::post('status', [RequestController::class, 'updateStatus'])->name('updateStatus')->middleware('permission:edit request status');
            Route::get('edit', [RequestController::class, 'edit'])->name('edit')->middleware('permission:edit request');
            Route::put('', [RequestController::class, 'update'])->name('update')->middleware('permission:edit request');
            Route::get('', [RequestController::class, 'show'])->name('show')->middleware('permission:edit request');
            Route::delete('', [RequestController::class, 'destroy'])->name('destroy')->middleware('permission:delete request');
        });
    });

    Route::prefix('comments')->name('comments.')->group(function () {
        Route::post('', [CommentController::class, 'store'])->name('store');
        Route::prefix('{id}')->middleware('checkCommentOwnership')->group(function () {
            Route::get('edit', [CommentController::class, 'edit'])->name('edit');
            Route::put('', [CommentController::class, 'update'])->name('update');
            Route::delete('', [CommentController::class, 'destroy'])->name('destroy');
        });
    });

    Route::prefix('dashboard')->name('dashboard.')->group(function () {
        Route::prefix('requests')->name('requests.')->middleware('permission:edit request|edit request status|delete request')->group(function () {
            Route::get('', [RequestController::class, 'index'])->name('index')->middleware('permission:edit request');
        });

        Route::prefix('statuses')->name('statuses.')->middleware('permission:create status|edit status|delete status')->group(function () {
            Route::get('', [StatusController::class, 'index'])->name('index');
            Route::get('create', [StatusController::class, 'create'])->name('create')->middleware('permission:create status');
            Route::post('', [StatusController::class, 'store'])->name('store');

            Route::prefix('{id}')->group(function () {
                Route::get('edit', [StatusController::class, 'edit'])->name('edit')->middleware('permission:edit status');
                Route::put('', [StatusController::class, 'update'])->name('update')->middleware('permission:edit status');
                Route::delete('', [StatusController::class, 'destroy'])->name('destroy')->middleware('permission:delete status');
            });
        });

        Route::prefix('categories')->name('categories.')->middleware('permission:create category|edit category|delete category')->group(function () {
            Route::get('', [CategoryController::class, 'index'])->name('index');
            Route::get('create', [CategoryController::class, 'create'])->name('create')->middleware('permission:create category');
            Route::post('', [CategoryController::class, 'store'])->name('store')->middleware('permission:create category');

            Route::prefix('{id}')->group(function () {
                Route::get('edit', [CategoryController::class, 'edit'])->name('edit')->middleware('permission:edit category');
                Route::put('', [CategoryController::class, 'update'])->name('update')->middleware('permission:edit category');
                Route::delete('', [CategoryController::class, 'destroy'])->name('destroy')->middleware('permission:delete category');
            });
        });
    });
});

require __DIR__ . '/auth.php';
