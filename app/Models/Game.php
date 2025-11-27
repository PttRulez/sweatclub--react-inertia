<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    protected $guarded = [];
    
    public function players()
    {
        return $this->belongsToMany(User::class)->withPivot('winner', 'points');
    }

    public function boardgame()
    {
        return $this->belongsTo(Boardgame::class);
    }
}
