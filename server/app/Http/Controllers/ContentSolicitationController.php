<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ContentSolicitation;
use App\Http\Controllers\FileController;
use App\Http\Controllers\VideoController;
use App\File;
use App\Video;
use Log;

class ContentSolicitationController extends Controller
{

    public function index()
    {
        $contentSolicitations = ContentSolicitation::all();
        return json_encode($contentSolicitations);
    }

    public function getById($id) {
        $fileController = new FileController();
        $videoController = new VideoController();

        $contentSolicitation = ContentSolicitation::find($id);
        $contentSolicitation->support_files = json_decode($fileController->getByContentSolicitationId($id));
        $contentSolicitation->video = json_decode($videoController->getByContentSolicitationId($id));
        return json_encode($contentSolicitation);
    }

    public function store(Request $request)
    {
        
        //Log::debug($request);
        $contentSolicitation = new ContentSolicitation();
        $contentSolicitation->user_id = 1;
        $contentSolicitation->theme_id = $request->theme_id;
        $contentSolicitation->title = $request->title;
        $contentSolicitation->support_text = $request->support_text;
        $contentSolicitation->save();

        // save video
        if ($request->video != 'null') {
            $videoController = new VideoController();

            $videoPath = $request->file('video')->store('videos','public');
            $videoName = $request->file('video')->getClientOriginalName();
            $videoType = $request->file('video')->getClientMimeType();

            $videoController->store($contentSolicitation->id, $videoName, $videoPath, $videoType);
        }
        else {
            $contentSolicitation->video_path = null;
        }

        //save support_files
        $support_files = $request->support_files;
        $fileController = new FileController();

        if (isset($request->support_files)) {
            try {
                foreach($support_files as $file) {
                    $filePath = $file->store('support_files','public');
                    $filename = $file->getClientOriginalName();
                    $fileType = $file->getClientMimeType();
                    $fileController->store($contentSolicitation->id, $filename, $filePath, $fileType);
                }
            } catch (\Exception $e) {
                Log::debug('vazio');       
            }
        }
        return response('done',200);
    }

    public function update(Request $request)
    {
        $id = $request->id;
        $contentSolicitation = ContentSolicitation::find($id);
        $contentSolicitation->theme_id = $request->theme_id;
        $contentSolicitation->title = $request->title;
        $contentSolicitation->support_text = $request->support_text;
        $contentSolicitation->save();

        //Add new Files
        if (isset($request->support_files)) {
                $fileController = new FileController();
                $support_files = $request->support_files;
                foreach($support_files as $file) {
                    $filePath = $file->store('support_files','public');
                    $filename = $file->getClientOriginalName();
                    $fileType = $file->getClientMimeType();
                    $fileController->store($contentSolicitation->id, $filename, $filePath, $fileType);
                }
        }
        //files to delete
        if(isset($contentSolicitation)) {
            $filesToDelete = $request->filesToDelete;
            Log::debug($filesToDelete);
            if (isset($filesToDelete)) {
                foreach ($filesToDelete as $idFile) {
                    $file = File::find($idFile);
                    \Storage::disk('public')->delete($file->path);
                    $file->delete();
                }
            }
        }
        //video changes
        if (isset($contentSolicitation)) {
            //If has a video, the old is delete
            if ($request->video != 'null') {
                $videoController = new VideoController();
    
                $videoPath = $request->file('video')->store('videos','public');
                $videoName = $request->file('video')->getClientOriginalName();
                $videoType = $request->file('video')->getClientMimeType();

                $oldVideo = Video::where('content_solicitation_id',$contentSolicitation->id)->get();
                if (isset($oldVideo) && sizeOf($oldVideo) != 0){
                    $oldVideo[0]->delete();
                }
    
                $videoController->store($contentSolicitation->id, $videoName, $videoPath, $videoType);
            } else {

                $idVideoToDelete = $request->videoToDelete;
                if(isset($idVideoToDelete)) {
                    $video = Video::find($idVideoToDelete);
                    \Storage::disk('public')->delete($video->path);
                    $video->delete();
                }
            }
        }
        return response('ok',200);
    }
    

    public function destroy($id)
    {
        $contentSolicitation = ContentSolicitation::find($id);

        if (isset($contentSolicitation)) {
            $fileController = new FileController();
            $fileController->destroyByContentSolicitationId($id);

            $contentSolicitation->delete();
            return response()->json([
                'res' => 'ok'
            ], 200);
        }
        return response('Not found', 404);
    }
}
