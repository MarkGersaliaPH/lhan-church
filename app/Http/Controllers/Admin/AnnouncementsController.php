<?php 
namespace App\Http\Controllers\Admin;;

use Markgersaliaph\LaravelCrudGenerate\Http\Controllers\CrudController;

class AnnouncementsController extends CrudController
{
    protected $main_page_route_name = 'admin.announcements.index';

    protected $inertiaMainPage = 'Admin/Announcements/List'; //name of react path to display
    protected $inertiaFormPage = 'Admin/Announcements/Form'; 
}
  