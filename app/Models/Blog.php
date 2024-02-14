<?php

namespace App\Models;
 
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Zoha\Metable;

class Blog extends Model implements HasMedia
{
    use HasFactory;  
    use InteractsWithMedia;
    use HasSlug; 
    use Metable;
    /**
     * Get the options for generating the slug.
     */
    public function getSlugOptions() : SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('title')
            ->saveSlugsTo('slug');
    }

    protected $appends = ['cover_image','meta_data']; 
    protected $fillable = ['title','slug','content','author','published_at','featured','created_by_id'];
    
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

    public function getMetaDataAttribute(){
        return $this->getMetas() ;

    }

    // in your model

    public function registerMediaCollections(): void
    {
        $this
            ->addMediaCollection('default')
            ->singleFile();
    }

    public function created_by(){
        return $this->belongsTo(User::class,'created_by_id')->withDefault();
    }
}
