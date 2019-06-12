<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\ContentSolicitation;
use App\Http\Controllers\FileController;
use App\Http\Controllers\VideoController;
use App\Http\Controllers\LikeController;
use App\File;
use App\Video;
use App\Theme;
use App\Category;
use App\User;
use Log;

class ContentSolicitationController extends Controller
{

    public function index()
    {
        $user = Auth::user();
        $contentSolicitations = ContentSolicitation::where('course_id', NULL)->get();
        if (isset($contentSolicitations)) {
            foreach ($contentSolicitations as $content) {
                $theme = Theme::find($content->theme_id);
                $category = Category::find($theme->category_id);
                $creator = User::find($content->user_id);

                $content->themeName = $theme->name;
                $content->categoryName = $category->name;
                $content->creator = $creator->name;
            }
        }
        return json_encode($contentSolicitations);
    }

    public function usersTopFive(){
        $idUsers = ContentSolicitation::select('user_id', DB::raw('COUNT(*) as qtd'))->groupBy('user_id')->orderBy('qtd','desc')->take(5)->get();
        return $idUsers;
    }

    public function getLastestContents(){
        $lastContents = ContentSolicitation::select('id','title','theme_id','user_id')->where([['course_id', NULL],['status','approved']])->orderBy('id','desc')->take(4)->get();

        $contents = array();
        if (isset($lastContents) && sizeOf($lastContents) > 0) {
            foreach ($lastContents as $content) {
                $content->theme = Theme::select('id','name','category_id')->find($content->theme_id);
                $content->category = Category::select('id','name')->find($content->theme->category_id);
                $content->creator = User::select('name')->find($content->user_id);
                array_push($contents, $content);
            }
        }
        return json_encode($contents);
    }

    public function getContentsByUser()
    {
        $user = Auth::user();
        $contentSolicitations = ContentSolicitation::where([['course_id', NULL],['user_id',$user->id]])->get();
        if (isset($contentSolicitations)) {
            foreach ($contentSolicitations as $content) {
                $theme = Theme::find($content->theme_id);
                $category = Category::find($theme->category_id);

                $content->themeName = $theme->name;
                $content->categoryName = $category->name;
            }
        }
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

    public function fullContentsByCourse($idCourse) {
        $fileController = new FileController();
        $videoController = new VideoController();
        $contentsByCourse = ContentSolicitation::where('course_id',$idCourse)->get();

        $contents = array();
        if (isset($contentsByCourse) && sizeOf($contentsByCourse) > 0) {
            foreach ($contentsByCourse as $content) {
                $content->support_files = json_decode($fileController->getByContentSolicitationId($content->id));
                $content->video = json_decode($videoController->getByContentSolicitationId($content->id));
                array_push($contents, $content);
            }
        }

        return $contents;
    }

    public function getByThemeId($id){
        $user = Auth::user();
        $likeController = new LikeController();
        $contents = ContentSolicitation::where('theme_id', $id) -> get();
        if(isset($contents) && sizeOf($contents)>0) {
            foreach ($contents as $content) {
                $content->likes = $likeController->likesInContent($content->id);
                $content->isLike = $likeController->isLikeContent($user->id, $content->id);
                $content->creator = User::find($content->user_id)->name;
            }
        }
        return json_encode($contents);
    }

    public function store(Request $request)
    {
        $user = Auth::user();
        //Log::debug($request);
        $contentSolicitation = new ContentSolicitation();
        $contentSolicitation->user_id = $user->id;
        $contentSolicitation->theme_id = $request->theme_id;
        $contentSolicitation->title = $request->title;
        $contentSolicitation->support_text = $request->support_text;
        $contentSolicitation->status = "saved";
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
        return json_encode('done',200);
    }

    public function contentChangeStatus(Request $request, $id){
        $content = ContentSolicitation::find($id);
        if(isset($content)) {
            switch ($request->status) {
                case 'pending':
                    $content->status = 'pending';
                    break;
                case 'approved':
                    $content->status = 'approved';
                    break;
                case 'rejected':
                    $content->status = 'rejected';
                    break;
                case 'recycled':
                    $content->status = 'recycled';
                    Log::debug($request->recycleMensage);
                    if (isset($request->recycleMensage)) {
                        $content->recycle_mensage = $request->recycleMensage;
                    }
                    break;
                case 'canceled':
                    $content->status = 'saved';
                    break;      
                default:
                    return response('',400);
                    break;
            }
            $content->save();
            return json_encode($content->status);
        } else {
            return response('not found', 404);
        }
    }

    public function update(Request $request)
    {
        $id = $request->id;
        $contentSolicitation = ContentSolicitation::find($id);
        $contentSolicitation->theme_id = $request->theme_id;
        $contentSolicitation->title = $request->title;
        $contentSolicitation->support_text = $request->support_text;
        $contentSolicitation->recycle_mensage = NULL;
        $contentSolicitation->status = 'saved';
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
        return json_encode('ok',200);
    }
    

    public function destroy($id)
    {
        $contentSolicitation = ContentSolicitation::find($id);

        if (isset($contentSolicitation)) {
            $fileController = new FileController();
            $fileController->destroyByContentSolicitationId($id);
            $videoController = new VideoController();
            $videoController->removePathByContentId($id);

            $contentSolicitation->delete();
            return response()->json([
                'res' => 'ok'
            ], 200);
        }
        return response('Not found', 404);
    }

    public function countContentsByCourse($idCourse){
        $countContents = ContentSolicitation::where('course_id',$idCourse)->count();
        return ($countContents);
    }
}
