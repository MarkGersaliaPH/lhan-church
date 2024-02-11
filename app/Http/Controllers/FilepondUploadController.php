<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Session\Session;
use Illuminate\Http\Request;

class FilepondUploadController extends Controller
{
    //

    public function upload(Request $request){ 
        $sessionId = session()->getId();

        $tempImage = $request->file('file');

        $tempImagePath = $tempImage->storeAs("temp/{$sessionId}", $tempImage->getClientOriginalName(), 'public');
        
        // Corrected session set with an associative array
        session(['temp' => $tempImagePath]);
        
        // Retrieve and dump the stored image path from the session 
        return response()->json(['message' => 'File uploaded successfully']);
  
    }
}