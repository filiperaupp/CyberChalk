<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ContentSolicitationToTheme;

class ContentSolicitationToThemeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store($idContentSolicitation, $idTheme)
    {
        $contentToTheme = new ContentSolicitationToTheme();
        $contentToTheme->content_solicitation_id = $idContentSolicitation;
        $contentToTheme->theme_id = $idTheme;

        $contentToTheme->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $contentToTheme = ContentSolicitationToTheme::find($id);
        if (isset($contentToTheme)) {
            $contentToTheme->delete();
            return response()->json([
                'res' => 'ok'
            ], 200);
        }
        return response()->json([
            'error' => 'not found'
        ], 404);
    }
}
