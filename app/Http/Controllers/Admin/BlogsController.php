<?php 
namespace App\Http\Controllers\Admin;;
use Illuminate\Support\Str;

use Markgersaliaph\LaravelCrudGenerate\Http\Controllers\CrudController;

class BlogsController extends CrudController
{
    protected $main_page_route_name = 'admin.blogs.index';

    protected $inertiaMainPage = 'Admin/Blogs/List'; //name of react path to display
    protected $inertiaFormPage = 'Admin/Blogs/Form'; 

    protected function beforeCreate($r)
    {
        $r->slug = Str::slug(request()->title);

        return $r;
    }
 
}
  