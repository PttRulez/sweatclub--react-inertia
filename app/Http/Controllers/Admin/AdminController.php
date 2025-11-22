<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Response;

class AdminController extends Controller
{
    public function index(): Response
    {
        return inertia('adminka/Index');
    }
}
