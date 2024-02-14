<?php 
namespace App\Http\Controllers\Admin;;

use App\Services\FileUploadService;
use Illuminate\Support\Str;

use Markgersaliaph\LaravelCrudGenerate\Http\Controllers\CrudController;

class BlogsController extends CrudController
{
    protected $main_page_route_name = 'admin.blogs.index';

    protected $inertiaMainPage = 'Admin/Blogs/List'; //name of react path to display
    protected $inertiaFormPage = 'Admin/Blogs/Form'; 

    protected $fileuploadService = "";

    

    public function __construct(FileUploadService $fileuploadService)
    {
        $this->fileuploadService = $fileuploadService;
    }
 

    protected function beforeCreate($r)
    { 
        $r->slug = Str::slug(request()->title);

        $r->created_by_id = auth()->id();
        return $r;
    }

    public function eagerLoad(){
        return ['created_by'];
    }
    
    public function afterCreate($r){   
        return $this->processImage($r);
    }
  
    
    public function beforeUpdate($r){
        $r->created_by_id = auth()->id(); 
        $r->setMeta(request()->meta_data); 
        return $r;
    }
    
 
    public function afterUpdate($r){    
        return $this->processImage($r);
    }

    public function processImage($r){ 
        $this->fileuploadService->processImage($r); 
        return $r;
    }
 
}
  