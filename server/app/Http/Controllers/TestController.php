<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TestController extends Controller
{
    //
    public function index() {
        return response()->json([
            ['id'=>1, 'name'=>'produto 1'],
            ['id'=>2, 'name'=>'produto 2'],
            ['id'=>3, 'name'=>'produto 3'],
            ['id'=>4, 'name'=>'produto 4'],
        ]);
    }
}
