<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\BoardgameResource;
use App\Models\Boardgame;
use App\Services\ImageService;
use Inertia\Response;
use Illuminate\Http\Request;
use function to_route;

class AdminBoardGameController extends Controller
{
    public function index(): Response
    {
        return inertia('adminka/boardgames/Index', [
            'boardgames' => BoardgameResource::collection(Boardgame::all())->resolve(),
        ]);
    }
    
    public function create(): Response
    {
        return inertia('adminka/boardgames/CreateBoardGame');
    }
    
    public function store(Request $request, ImageService $imgService)
    {
        $validated = $request->validate(
            [
                'name' => 'required|unique:boardgames',
                'has_points' => 'boolean',
                'image' => 'required|image',
            ],
            [
                'name.required' => 'Нужно заполнить название игры',
                'image.required' => 'Обязательно приложите картинку игры',
            ]
        );
        
        $images = $imgService->saveWithThumbnail(file: $validated['image'], dir: 'img/boardgames/');
        
        Boardgame::create([
            'name' => $validated['name'],
            'has_points' => json_decode($request->has_points),
            'image_path' => $images['image_path'],
            'thumbnail' => $images['thumbnail'],
        ]);

        return to_route('adminka.boardgames.index')->with('success', 'Игра успешно создана');
    }
}
