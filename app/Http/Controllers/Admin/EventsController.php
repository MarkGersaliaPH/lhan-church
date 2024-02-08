<?php 
namespace App\Http\Controllers\Admin;;

use Markgersaliaph\LaravelCrudGenerate\Http\Controllers\CrudController;

class EventsController extends CrudController
{
    protected $main_page_route_name = 'admin.events.index';

    protected $inertiaMainPage = 'Admin/Events/List'; //name of react path to display
    protected $inertiaFormPage = 'Admin/Events/Form'; 
}
  