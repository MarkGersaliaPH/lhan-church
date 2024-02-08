<?php 
namespace App\Http\Controllers\Admin;;

use Illuminate\Validation\Rules\Password;
use Markgersaliaph\LaravelCrudGenerate\Http\Controllers\CrudController;

class UsersController extends CrudController
{
    protected $main_page_route_name = 'admin.users.index';

    protected $inertiaMainPage = 'Admin/Users/List'; //name of react path to display
    protected $inertiaFormPage = 'Admin/Users/Form'; 

    public function getRules(){
        return [
            'name'=>'required',
            'email'=>'required|email',
            'password'=>['required', 'confirmed', Password::min(8)->mixedCase()]
        ];
    }

    public function updateRules(){
        return [
            'name'=>'required',
            'email'=>'required|email',
            'password'=>['confirmed', Password::min(8)->mixedCase()]
        ];
    }
}
  