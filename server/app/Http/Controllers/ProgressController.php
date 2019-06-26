<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\ContentSolicitationController;
use App\Progress;
use Log;

class ProgressController extends Controller
{
    public function getProgressByContent($idContent,$idUser){
        $progress = Progress::where([['content_solicitation_id',$idContent],['user_id',$idUser]])->first();
        if (isset($progress)) {
            return true;
        } else {
            return false;
        }
    }

    public function store(Request $request){
        $newProgress = new Progress();
        $newProgress->content_solicitation_id = $request->content_id;
        $newProgress->course_id = $request->course_id;
        $newProgress->user_id = Auth::user()->id;

        $newProgress->save();
        return json_encode(true);
    }

    public function getPercentage() {
        $contentController = new ContentSolicitationController();
        $courseController = new CourseController();

        $user = Auth::user();
        $coursesProgress = Progress::select('course_id')->where('user_id',$user->id)->groupBy('course_id')->get();
        
        $courses = array();
        if(isset($coursesProgress)) {
            foreach ($coursesProgress as $progress) {
                Log::debug($progress);
                $course = $courseController->getCourseInfo($progress->course_id);
                $course->totalContents = $contentController->countContentsByCourse($progress->course_id);
                $course->contentsDone = Progress::where([['course_id',$progress->course_id],['user_id',$user->id]])->count();
                $course->creator = $user->name;
                array_push($courses,$course); 
            }
        }
        return json_encode($courses);
    }


    public function destroy(Request $request){
        $user = Auth::user();
        $progress = Progress::where([['content_solicitation_id',$request->content_id],['user_id',$user->id]]);
        if (isset($progress)) {
            $progress->delete();
            return json_encode(false);
        }
    }
}
