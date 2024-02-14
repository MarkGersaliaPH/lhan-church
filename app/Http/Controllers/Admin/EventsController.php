<?php 
namespace App\Http\Controllers\Admin;;

use App\Models\Branch;
use App\Services\FileUploadService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Markgersaliaph\LaravelCrudGenerate\Http\Controllers\CrudController;

class EventsController extends CrudController
{
    protected $main_page_route_name = 'admin.events.index';

    protected $inertiaMainPage = 'Admin/Events/List'; //name of react path to display
    protected $inertiaFormPage = 'Admin/Events/Form'; 

    protected $fileuploadService = "";

    

    public function __construct(FileUploadService $fileuploadService)
    {
        $this->fileuploadService = $fileuploadService;
    }
 
    public function afterCreate($r){   
        return $this->processImage($r);
    }
    
    public function afterUpdate($r){    
        return $this->processImage($r);
    }
    
    public function processImage($r){ 
        $this->fileuploadService->processImage($r); 
        return $r;
    }
      
    public function edit($resource)
    {
        $resource = $this->processResource($resource);
        $branches = Branch::All();

        if ($this->renderByInertia) {
            return Inertia::render($this->getFormPage(), ['item' => $resource,'branches'=>$branches]);
        }

        return $this->buildJson(['item' => $resource]);
    }

    
    public function create()
    {
        $branches = Branch::All();
        if ($this->renderByInertia) {
            return Inertia::render($this->getFormPage(), ['item' => $this->model(),'branches'=>$branches]);
        }
    }
 
}
  