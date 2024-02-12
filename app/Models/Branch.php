<?php

namespace App\Models;

use App\Traits\HasImageUpload;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Branch extends Model  implements HasMedia
{
    use HasFactory;
    use InteractsWithMedia;

    protected $fillable = ['address', 'description', 'head_pastor', 'is_main', 'name', 'email', 'mobile_no', 'tel_no', 'services'];

    protected $appends = ['cover_image'];

    /**
     * Get URL of the associated image.
     *
     * @return string|null
     */
    public function getCoverImageAttribute()
    {
        $media = $this->getFirstMedia('default'); 
        if($media){
            return ['name'=>$media->name,'url'=>$media->getFullUrl()];
        }
        
        return [];
    }

    // in your model

    public function registerMediaCollections(): void
    {
        $this
            ->addMediaCollection('default')
            ->singleFile();
    }
}
