<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;

class FileUploadService
{
    public function processImage($model)
    {

        dd(request()->hasFile('file'));
        // Verify that the image belongs to the correct session
        $tempImagePath = session('temp');
        if (Storage::disk('public')->exists($tempImagePath)) {  
            // Add the temporarily stored image to the media collection
            $model->addMedia(storage_path("app/public/{$tempImagePath}"))->toMediaCollection('default');

            // Clean up temporary storage (if needed)
            Storage::disk('public')->delete($tempImagePath);

            session()->forget('temp');
        } else {
            // Image doesn't belong to the correct session
            // Handle accordingly (e.g., show an error, log the incident)
        }
    }
}
