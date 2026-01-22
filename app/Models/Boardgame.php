<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Boardgame extends Model
{
     protected $guarded = [];

    public function games()
    {
        return $this->hasMany(Game::class);
    }
}
