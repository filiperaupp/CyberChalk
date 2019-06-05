<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Category;

class CategoryController extends Controller
{

    public function index()
    {
        $categories = Category::all();
        return json_encode($categories);
    }

    public function store(Request $request)
    {
        $newCategory = new Category();
        $newCategory->name = $request->name;
        $newCategory->session = $request->session;
        $newCategory->save();
        return response()->json([
            'res' => 'ok'
        ], 200);
    }

    public function getById($id){
        $category = Category::find($id);
        if (isset($category)) {
            return json_encode($category);
        }
    }
    
    public function update(Request $request, $id)
    {
        $category = Category::find($id);
        if (isset($category)) {
            $category->session = $request->session;
            $category->name = $request->name;
            $category->save();
            return response()->json([
                'res' => 'ok'
            ], 200);
        }
        return response('Not found', 404);
    }

    public function destroy($id)
    {
        $category = Category::find($id);
        if (isset($category)) {
            $category->delete();
            return response()->json([
                'res' => 'ok'
            ], 200);
        }
        return response('Not found', 404);
    }
}
