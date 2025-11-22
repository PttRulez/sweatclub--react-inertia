<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Response;

class AdminBoardGameController extends Controller
{
    public function index(): Response
    {
        return inertia('adminka/boardgames/Index');
    }
}
