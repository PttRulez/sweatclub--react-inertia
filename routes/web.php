<?php

use App\Http\Controllers\GamesController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', [GamesController::class, 'index'])->name('home');

require __DIR__.'/settings.php';
require __DIR__.'/admin.php';
