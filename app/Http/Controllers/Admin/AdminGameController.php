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
use Illuminate\Validation\ValidationException;
use Inertia\Response;
use Storage;
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
    
    public function index(): Response
    {
        return inertia('adminka/games/Index', [
            'games' => Game::all()
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
        
        if (!collect($validated['players'])->contains(fn($p) => $p['winner'])) {
            throw ValidationException::withMessages([
                'players' => 'Должен быть выбран хотя бы один победитель.',
            ]);
        }
        
        DB::transaction(function () use ($request, $imgService, $validated) {
            $game = Game::create([
                'boardgame_id' => $validated['boardgame_id'],
                'date_played' => Carbon::parse($validated['date_played']),
            ]);
            
            $players = collect($request->players)->mapWithKeys(function ($player) {
                $points = blank($player['points']) ? null : $player['points'];
                
                return [
                    $player['id'] => [
                        'winner' => $player['winner'],
                        'points' => $points
                    ]
                ];
            })->all();
            
            $game->users()->attach($players);
            if ($request->hasFile('photo')) {
                $path = $imgService->saveWebp(file: $validated['photo'], dir: 'img/games/');
                $game->update([
                    'photo_path' => $path
                ]);
            }
        });
    }
    
    public function edit(Game $game): Response
    {
        $game->load('users')->append('players');
        return inertia('adminka/games/EditGame', [
            'boardgames' => BoardgameResource::collection(Boardgame::all())->resolve(),
            'game' => $game,
            'users' => UserResource::collection(User::all())->resolve(),
        ]);
    }
    
    public function update(Request $request, Game $game, ImageService $imgService)
    {
        $validated = $request->validate([
            'boardgame_id' => 'required|integer|exists:boardgames,id',
            'photo' => 'nullable|image',
            'date_played' => 'required',
            'players' => 'required|array|min:1',
            'players.*.id' => 'required|integer|exists:users,id',
            'players.*.winner' => 'boolean',
            'players.*.points' => 'nullable|integer',
        ]);
        
        if (!collect($validated['players'])->contains(fn($p) => $p['winner'])) {
            throw ValidationException::withMessages([
                'players' => 'Должен быть выбран хотя бы один победитель.',
            ]);
        }
        
        DB::transaction(function () use ($request, $imgService, $validated, $game) {
            $game->fill([
                'boardgame_id' => $validated['boardgame_id'],
                'date_played' => Carbon::parse($validated['date_played']),
            ]);
            
            $players = collect($validated['players'])->mapWithKeys(function ($player) {
                return [
                    $player['id'] => [
                        'winner' => $player['winner'],
                        'points' => blank($player['points']) ? null : $player['points'],
                    ],
                ];
            })->all();
            
            $game->users()->sync($players);
            
            if ($request->hasFile('photo')) {
                if ($game->photo_path) {
                    Storage::disk('public')->delete($game->photo_path);
                }
                
                $path = $imgService->saveWebp(
                    file: $request->file('photo'),
                    dir: 'img/games/'
                );
                
                $game->photo_path = $path;
            }
            
            $game->save();
        });
        
        return to_route('home')->with('success', 'Обновили');
    }
}