<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ContentSolicitation;
use App\Http\Controllers\FileController;
use App\Http\Controllers\VideoController;
use App\Http\Controllers\ProgressController;
use Illuminate\Support\Facades\Auth;
use Log;

class ContentToCourseController extends Controller
{
    public function addContent(Request $request){
        $user = Auth::user();
        $contentSolicitation = new ContentSolicitation();
        $contentSolicitation->user_id = $user->id;
        $contentSolicitation->course_id = $request->course_id;
        $contentSolicitation->title = $request->title;
        $contentSolicitation->support_text = $request->support_text;
        $contentSolicitation->status = "in course";
        
        $lastContent = ContentSolicitation::where('course_id',$request->course_id)->orderBy('position', 'desc')->first();
        Log::debug($lastContent);
        if (!isset($lastContent)) {
            $contentSolicitation->position = 1;
        } else  {
            $position = $lastContent->position;
            $contentSolicitation->position = ($position+1);
        }

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

    public function changePosition(Request $request){
        Log::debug($request);
        $newLeftId = $request[0];
        $newRightId = $request[1];

        $newLeft = ContentSolicitation::find($newLeftId);
        $newRight = ContentSolicitation::find($newRightId);
        $leftPosition = $newLeft->position;
        
        $newLeft->position = $newRight->position;
        $newRight->position = $leftPosition;
        $newLeft->save();
        $newRight->save();

    }

    public function update(Request $request)
    {
        $id = $request->id;
        $contentSolicitation = ContentSolicitation::find($id);
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
                    \Storage::disk('public')->delete($oldVideo[0]->path);
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
    //Content simple list
    public function contentsByCourse($id){
        $videoController = new VideoController();
        $fileController = new FileController();

        $allContents = ContentSolicitation::select('id','title','created_at','position')->where('course_id', $id)->orderBy('position')->get();
        
        if (isset($allContents) && sizeOf($allContents) > 0) {
            foreach ($allContents as $c) {
                $c->hasVideo = $videoController->hasVideo($c->id);
                $c->hasFiles = $fileController->howManyFiles($c->id);
            }
        }

        return json_encode($allContents);
    }
    //Define status if are done or not
    public function contentsByCourseWithProgress($id){
        $user = Auth::user();
        $progressController = new ProgressController();

        $allContents = ContentSolicitation::select('id','title','created_at','position')->where('course_id', $id)->orderBy('position')->get();
        
        if (isset($allContents) && sizeOf($allContents) > 0) {
            foreach ($allContents as $content) {
                $content->isDone = $progressController->getProgressByContent($content->id,$user->id);
            }
        }

        return json_encode($allContents);
    }

    public function destroy($id)
    {
        $contentSolicitation = ContentSolicitation::find($id);

        if (isset($contentSolicitation)) {
            $fileController = new FileController();
            $fileController->destroyByContentSolicitationId($id);
            $videoController = new VideoController();
            $videoController->removePathByContentId($id);
            
            $idCourse = $contentSolicitation->course_id;

            $contentSolicitation->delete();

            //re order contents
            $contentsInTheCourse = ContentSolicitation::where('course_id',$idCourse)->get();
            if (isset($contentsInTheCourse) && sizeOf($contentsInTheCourse) > 0) {
                for ($i = 0; $i<sizeof($contentsInTheCourse); $i++) {
                    $contentsInTheCourse[$i]->position = ($i+1);
                    $contentsInTheCourse[$i]->save();
                }
            }



            return response()->json([
                'res' => 'ok'
            ], 200);
        }
        return response('Not found', 404);
    }
}
