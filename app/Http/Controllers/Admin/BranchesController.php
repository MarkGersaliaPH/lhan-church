<?php 
namespace App\Http\Controllers\Admin;;

use App\Services\FileUploadService;
use Markgersaliaph\LaravelCrudGenerate\Http\Controllers\CrudController;

class BranchesController extends CrudController
{
    protected $main_page_route_name = 'admin.branches.index';

    protected $inertiaMainPage = 'Admin/Branches/List'; //name of react path to display
    protected $inertiaFormPage = 'Admin/Branches/Form'; 

    protected $fillable = ['address','description','head_pastor','is_main'];

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
 
 
 
 
}
  