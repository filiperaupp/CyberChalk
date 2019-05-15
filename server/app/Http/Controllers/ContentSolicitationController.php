<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ContentSolicitation;
use App\Http\Controllers\FileController;
use Log;

class ContentSolicitationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $contentSolicitations = ContentSolicitation::all();
        return json_encode($contentSolicitations);
    }

    public function getById($id) {
        $contentSolicitation = ContentSolicitation::find($id);
        return json_encode($contentSolicitation);
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
    public function store(Request $request)
    {
        
        //Log::debug($request);
        $contentSolicitation = new ContentSolicitation();
        $contentSolicitation->user_id = 1;
        $contentSolicitation->theme_id = $request->theme_id;
        $contentSolicitation->title = $request->title;
        $contentSolicitation->support_text = $request->support_text;
        // save video
        if ($request->video != 'null') {
            $video_path = $request->file('video')->store('videos','public');
            $contentSolicitation->video_path = $video_path;
        }
        else {
            $contentSolicitation->video_path = null;
        }
        //save support_files
        
        $contentSolicitation->save();

        $support_files = $request->support_files;
        $fileController = new FileController();

        //if (isset($request->support_files)) {
            //try {
                foreach($support_files as $file) {
                    $filePath = $file->store('support_files','public');
                    $filename = $file->getClientOriginalName();
                    $fileController->store($contentSolicitation->id, $filename, $filePath);
                }
            //} catch (\Exception $e) {
                //Log::debug('vazio');  
                //return response('error',400);          
            //}
        //}
        

        return response('done',200);
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
        //
    }
}
