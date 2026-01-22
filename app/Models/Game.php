<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Game extends Model
{
    protected $guarded = [];
    
    protected $casts = [
        'date_played' => 'date:Y-m-d',
    ];
    
    protected $appends = [
        'players',
    ];

    protected $with = [
        'boardgame',
    ];
    
    public function users()
    {
        return $this->belongsToMany(User::class)->as('result')->withPivot('winner', 'points');
    }
    
    public function boardgame()
    {
        return $this->belongsTo(Boardgame::class)->select(['id', 'name', 'thumbnail']);
    }
    
    protected function players(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->users
                ->sortBy([
                    ['result.winner', 'desc'],
                    ['result.points', 'desc'],
                ])
                ->map(fn($user) => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'winner' => (bool)$user->result->winner,
                    'points' => $user->result->points,
                    'avatar_path' => $user->avatar_path,
                ])
                ->values()
        );
    }
}
