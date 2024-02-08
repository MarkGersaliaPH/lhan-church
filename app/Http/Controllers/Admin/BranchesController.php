<?php 
namespace App\Http\Controllers\Admin;;

use Markgersaliaph\LaravelCrudGenerate\Http\Controllers\CrudController;

class BranchesController extends CrudController
{
    protected $main_page_route_name = 'admin.branches.index';

    protected $inertiaMainPage = 'Admin/Branches/List'; //name of react path to display
    protected $inertiaFormPage = 'Admin/Branches/Form'; 

    protected $fillable = ['address','description','head_pastor','is_main'];

    public function getRules(){
        return ['address'=>'required','description'=>'required','head_pastor'=>'required'];
    }
}
  