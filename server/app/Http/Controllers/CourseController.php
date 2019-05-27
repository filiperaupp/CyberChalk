<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Course;
use Log;
class CourseController extends Controller
{

    public function index(){
        $courses = Course::all();
        return json_encode($courses);
    }

    public function getById($id){
        $course = Course::find($id);
        return json_encode($course);
    }

    public function store(Request $request){
        $newCourse = new Course();
        $newCourse->user_id = 1;
        $newCourse->theme_id = $request->theme_id;
        $newCourse->title = $request->title;
        $newCourse->description = $request->description;
        $newCourse->status = 'saved';
        $newCourse->save();
    }

    public function sendToApprove(Request $request, $id){
        $course = Course::find($id);

        if(isset($course)) {
            $course->status = 'pending';
            $course->save();
            
        } else {
            return response('not found', 400);
        }
    }

    public function changeStatus(Request $request, $id) {
        $course = Course::find($id);

        if(isset($course)) {
            $newStatus = $request->action;
            switch ($newStatus) {
                case 'approve':
                    $course->status = 'approved';
                    break;
                case 'recycle': 
                    $course->status = 'recycled';
                    break;
                case 'reject':
                    $course->status = 'rejected';
                    break;
                default:
                    return response('',400);
                    break;
            }
            $course->save();
            return json_encode($course->status);
            
        } else {
            return response('not found', 400);
        }
    }

    public function update(Request $request, $id) {
        $course = Course::find($id);
        if (isset($course)) {
            $course->theme_id = $request->theme_id;
            $course->title = $request->title;
            $course->description = $request->description;
            $course->save();
            return response('ok',200);
        } else {
            return response('not found', 400);
        }
    }

    public function destroy($id) {
        $course = Course::find($id);
        if (isset($course)) {
            $course->delete();
            return response('ok',200);
        } else {
            return response('not found', 400);
        }
    }
}
