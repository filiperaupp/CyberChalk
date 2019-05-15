<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

use Illuminate\Support\Facades\Input;

use Log;

class TestController extends Controller
{
    private $path;

    public function index() {
        return response()->json([
            ['id'=>1, 'name'=>'produto 1'],
            ['id'=>2, 'name'=>'produto 2'],
            ['id'=>3, 'name'=>'produto 3'],
            ['id'=>4, 'name'=>'produto 4'],
        ]);
    }

    public function file(Request $request){

        $files = $request->photos;
        Log::debug($request->photos);

        try {
            foreach($files as $file) {
                $this->path = $file->store('profile_photos','public');
                Log::debug('oi');
            }
        } catch (\Exception $e) {
            Log::debug('vazio');            
        }

        // foreach($files as $file) {
        //     Log::debug('oi');
        // }
        //$this->path = $request->file('photo')->store('profile_photos','public');
        //Log::debug($this->path);
    }

    public function destroy(){

        Log::debug($this->path);
        Log::debug('chegou');
        $path2 = "profile_photos/zRN75BM0PI5864QQnk8tNbUdY0aB0Ib7QtPB8vqN.jpeg";
        try {
            Storage::disk('public')->delete($path2);
            Log::debug('tentou');
            return response('',200);
        }
        catch (\Exception $e){
            Log::debug('nem tentou');
            return response('',400);
        };
        // $test = Teste::find($id);
        // if (isset($spot)) {
        //     $arquivo = $post->file_path;
        //     $post->delete();
        // }

    }
}
