<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\AdminBoardGameController;

Route::prefix('adminka')->middleware('admin')->name('adminka.')->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('index');
    Route::get('/boardgames', [AdminBoardGameController::class, 'index'])->name('boardgames.index');
}
);