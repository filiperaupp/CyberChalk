<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Video;

class VideoController extends Controller
{

    public function download($id){
        $video = Video::find($id);
        if (isset($video)) {
            $path = \Storage::disk('public')->getDriver()->getAdapter()->applyPathPrefix($video->path);
            return response()->download($path, $video->video_name, array('content-type' => $video->mimeType));
        }
    }

    public function store($idContent, $videoName, $videoPath, $videoType)
    {
        $newVideo = new video();
        $newVideo->video_name = $videoName;
        $newVideo->path = $videoPath;
        $newVideo->mimeType = $videoType;
        $newVideo->content_solicitation_id = $idContent;

        $newVideo->save();
    }

    public function getByContentSolicitationId($id){
        $videoByContentSolicitation = Video::where('content_solicitation_id',$id)->get();

        return json_encode($videoByContentSolicitation);
        
    }

    public function hasVideo($contentId)
    {
        $video = Video::where('content_solicitation_id',$contentId)->get();
        return sizeof($video);
    }

    public function removePathByContentId($id){
        $video = Video::where('content_solicitation_id',$id)->get();
        if (isset($video) && sizeof($video) > 0)
            \Storage::disk('public')->delete($video[0]->path);
    }


}
