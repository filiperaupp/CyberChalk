<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Like;
use Log;

class LikeController extends Controller
{
    public function store(Request $request){
        $user = Auth::user();
        $newLike = new Like();
        $newLike->user_id = $user->id;
        if (isset($request->content_id)) {
            $newLike->content_solicitation_id = $request->content_id;
        } else if (isset($request->course_id)) {
            $newLike->course_id = $request->course_id;
        }
        $newLike->save();
        return json_encode(true);
    }

    public function likesInContent($idContent){
        $totalLikes = Like::where('content_solicitation_id',$idContent)->count();
        return $totalLikes;
    }

    public function likesInCourse($idCourse){
        $totalLikes = Like::where('course_id',$idCourse)->count();
        return $totalLikes;
    }

    public function isLikeContent($idUser, $idContent){
        $isLike = Like::where([['user_id',$idUser],['content_solicitation_id',$idContent]])->first();
        if (isset($isLike)) {
            return true;
        } else {
            return false;
        }
    }

    public function isLikeCourse($idUser, $idCourse){
        $isLike = Like::where([['user_id',$idUser],['course_id',$idCourse]])->first();
        if (isset($isLike)) {
            return true;
        } else {
            return false;
        }
    }

    public function destroy(Request $request){
        $user = Auth::user();
        $like = new Like();
        if (isset($request->content_id)) {
            $like = Like::where([['user_id',$user->id],['content_solicitation_id',$request->content_id]])->get();
        } else if (isset($request->course_id)) {
            $like = Like::where([['user_id',$user->id],['course_id',$request->course_id]])->get();
        }
        if (isset($like) && sizeOf($like) > 0) {
            $like[0]->delete();
            return json_encode(false);
        }
    }
}
