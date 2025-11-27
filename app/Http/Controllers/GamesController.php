<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Game;
use Inertia\Response;

class GamesController extends Controller
{
    public function index(): Response
    {
        return inertia('Home', [
            'games' => Game::all(),
        ]);
    }
}