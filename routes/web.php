<?php

use App\Http\Controllers\FilepondUploadController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::middleware('verified')->group(function(){

        Route::get('admin/dashboard', function () {
            return Inertia::render('Dashboard');
        })->name('dashboard');

        Route::resource('admin/blogs',App\Http\Controllers\Admin\BlogsController::class)->names('admin.blogs');
        Route::resource('admin/users',App\Http\Controllers\Admin\UsersController::class)->names('admin.users'); 
        Route::resource('admin/events',App\Http\Controllers\Admin\EventsController::class)->names('admin.events');
        Route::resource('admin/branches',App\Http\Controllers\Admin\BranchesController::class)->names('admin.branches');
        
   
      });

      Route::post('filepond_upload',[FilepondUploadController::class,'upload']);
});

require __DIR__.'/auth.php';

Route::resource('admin/announcements',App\Http\Controllers\Admin\AnnouncementsController::class)->names('admin.announcements');

