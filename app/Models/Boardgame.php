<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Boardgame extends Model
{
     protected $fillable = ['name', 'has_points', 'image_path'];

    public function games()
    {
        return $this->hasMany(Game::class);
    }
}
