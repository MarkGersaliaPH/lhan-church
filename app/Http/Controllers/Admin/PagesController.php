<?php 
namespace App\Http\Controllers\Admin;;

use Markgersaliaph\LaravelCrudGenerate\Http\Controllers\CrudController;

class PagesController extends CrudController
{
    protected $main_page_route_name = 'admin.pages.index';

    protected $inertiaMainPage = 'Admin/Pages/List'; //name of react path to display
    protected $inertiaFormPage = 'Admin/Pages/Form'; 
}
  