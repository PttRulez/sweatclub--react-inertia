<?php

namespace App\Http\Controllers;

use Inertia\Response;

class AdminController extends Controller
{
    public function index(): Response
    {
        return inertia('adminka/Index');
    }
}
