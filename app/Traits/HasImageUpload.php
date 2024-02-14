<?php

namespace App\Traits;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Spatie\MediaLibrary\InteractsWithMedia;

trait HasImageUpload
{

    use InteractsWithMedia;  // Trait from Spatie's Media Library


    public function processImage()
    {
        // Verify that the image belongs to the correct session
        $tempImagePath = session('temp');
        if (Storage::disk('public')->exists($tempImagePath)) {
            // Add the temporarily stored image to the media collection
            $this->addMedia(storage_path("app/public/{$tempImagePath}"))->toMediaCollection('default');

            // Clean up temporary storage (if needed)
            Storage::disk('public')->delete($tempImagePath);

            session()->forget('temp');
        } else {
            // Image doesn't belong to the correct session
            // Handle accordingly (e.g., show an error, log the incident)
        }
    }
 
}
