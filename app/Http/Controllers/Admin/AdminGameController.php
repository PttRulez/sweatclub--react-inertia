<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\BoardgameResource;
use App\Http\Resources\UserResource;
use App\Models\Boardgame;
use App\Models\Game;
use App\Models\User;
use App\Services\ImageService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Response;
use function blank;

class AdminGameController extends Controller
{
    public function create(): Response
    {
        return inertia('adminka/games/CreateGame', [
            'boardgames' => BoardgameResource::collection(Boardgame::all())->resolve(),
            'users' => UserResource::collection(User::all())->resolve(),
            
        ]);
    }
    
    public function store(Request $request, ImageService $imgService)
    {
        $validated = $request->validate([
            'boardgame_id' => 'required|integer|exists:boardgames,id',
            'photo' => 'nullable',
            'date_played' => 'required',
            
            'players' => 'required|array|min:1',
            'players.*.id' => 'required|integer|exists:users,id',
            'players.*.winner' => 'boolean',
            'players.*.points' => 'nullable|integer',
        ]);
        
        DB::transaction(function () use ($request, $imgService, $validated) {
            $game = Game::create([
                'boardgame_id' => $validated['boardgame_id'],
                'date_played' => Carbon::parse($validated['date_played']),
            ]);
            
            $players = json_decode($request->players) ?? [];
            $players = collect($players)->mapWithKeys(function ($player) {
                $points = blank($player->points) ? null : $player->points;
                
                return [
                    $player->id => [
                        'winner' => $player->winner,
                        'points' => $points
                    ]
                ];
            })->all();
            
            $game->players()->attach($players);
            
            if ($request->hasFile('photo')) {
                $path = $imgService->saveWebp(file: $validated['photo'], dir: 'img/games/');
                
                $game->update([
                    'photo_path' => $path
                ]);
            }
        });
    }
}