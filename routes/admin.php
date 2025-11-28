<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\AdminBoardGameController;
use App\Http\Controllers\Admin\AdminGameController;

Route::prefix('adminka')->middleware('admin')->name('adminka.')->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('index');
    Route::resource('boardgames', AdminBoardGameController::class)->only(['index', 'create', 'store']);
    Route::resource('games', AdminGameController::class);
});