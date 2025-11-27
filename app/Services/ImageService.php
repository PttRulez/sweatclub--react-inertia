<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Laravel\Facades\Image;


class ImageService
{
    public function saveWebp(
        UploadedFile $file,
        string       $dir = 'uploads',
        int          $maxW = 1920,
        int          $maxH = 1920,
        int          $quality = 80,
    ): string
    {
        $img = Image::read($file)->scaleDown($maxW, $maxH);
        
        $hashed = $file->hashName($dir);
        $path = preg_replace('/\.[^.]+$/', '.webp', $hashed)
            ?: ($dir . '/' . Str::random() . '.webp');
        
        $encoded = $img->encodeByExtension('webp', quality: $quality);
        
        Storage::disk('public')->put($path, (string)$encoded);
        
        return '/storage/' . $path;
    }
}