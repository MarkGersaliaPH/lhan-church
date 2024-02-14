<?php

namespace App\Models;

use App\Traits\HasImageUpload;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Event extends Model implements HasMedia
{
    use HasFactory;
    use InteractsWithMedia;

    
    protected $appends = ['cover_image'];
    protected $fillable = ['title','address','description','start_date','end_date','branch_id'];

    protected $casts  = [
        'created_at' => 'datetime:Y-m-d h:m a',
        'updated_at' => 'datetime:Y-m-d h:m a',
    ];
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
