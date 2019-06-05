<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Theme;
use App\ContentSolicitation;
use App\Course;

class ThemeController extends Controller
{
    
    public function index()
    {
        $themes = Theme::all();
        return json_encode($themes);
    }

    public function themeByCategory($id)
    {
        $themes = Theme::where('category_id',$id)->get();

        if(isset($themes) && sizeOf($themes)>0) {
            foreach ($themes as $theme) {
                $theme->contents = ContentSolicitation::where([['theme_id',$theme->id],['status','approved']])->count();
                $theme->courses = Course::where('theme_id',$theme->id)->count();
            }
        }

        return json_encode($themes);
    }

    public function getById($id){
        $theme = Theme::find($id);
        if (isset($theme)) {
            return json_encode($theme);
        }
    }

    public function store(Request $request)
    {
        $newTheme = new Theme();
        $newTheme->name = $request->name;
        $newTheme->category_id = $request->category_id;

        $newTheme->save();
        return response()->json([
            'res' => 'ok'
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $theme = Theme::find($id);
        if (isset($theme)) {
            $theme->category_id = $request->category_id;
            $theme->name = $request->name;
            $theme->save();
            return response()->json([
                'res' => 'ok'
            ], 200);
        }
        return response()->json([
            'error' => 'not found'
        ], 404);
    }
    
    public function destroy($id)
    {
        $theme = Theme::find($id);
        if (isset($theme)) {
            $theme->delete();
            return response()->json([
                'res' => 'ok'
            ], 200);
        }
        return response()->json([
            'error' => 'not found'
        ], 404);
    }
}
