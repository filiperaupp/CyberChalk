<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\ContentSolicitation;
use App\Course;
use App\Theme;
use App\Category;
use App\User;
use Log;
class CourseController extends Controller
{

    public function index(){
        $courses = Course::all();
        if (isset($courses) && sizeOf($courses)>0) {
            foreach ($courses as $course) {
                $theme = Theme::find($course->theme_id);
                $category = Category::find($theme->category_id);
                $user = User::find($course->user_id);
                $contents = ContentSolicitation::where('course_id',$course->id)->get();

                $course->themeName = $theme->name;
                $course->categoryName = $category->name;
                $course->creatorName = $user->name;
                $course->qtdContent = sizeOf($contents);
            }
        }
        return json_encode($courses);
    }

    public function allCoursesByUser(){
        $userId = Auth::user()->id;
        $courses = Course::where('user_id', $userId)->get();
        if (isset($courses) && sizeOf($courses)>0) {
            foreach ($courses as $course) {
                $theme = Theme::find($course->theme_id);
                $category = Category::find($theme->category_id);
                $countContents = ContentSolicitation::where('course_id',$course->id)->count();

                $course->themeName = $theme->name;
                $course->categoryName = $category->name;
                $course->itens = $countContents;
            }
        }
        return json_encode($courses);
    }

    public function getById($id){
        $course = Course::find($id);
        return json_encode($course);
    }

    public function getByThemeId($id){
        $courses = Course::where('theme_id',$id)->get();
        return json_encode($courses);
    }

    public function store(Request $request){
        $user = Auth::user();
        $newCourse = new Course();
        $newCourse->user_id = $user->id;
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
            switch ($request->status) {
                case 'pending':
                    $course->status = 'pending';
                    break;
                case 'approved':
                    $course->status = 'approved';
                    break;
                case 'recycled': 
                    $course->status = 'recycled';
                    break;
                case 'rejected':
                    $course->status = 'rejected';
                    break;
                case 'canceled':
                    $course->status = 'saved';
                    break;      
                default:
                break;
            }
            $course->save();
            Log::debug($course);
            return json_encode($course->status);
            
        }
    }

    public function update(Request $request, $id) {
        $course = Course::find($id);
        if (isset($course)) {
            $course->theme_id = $request->theme_id;
            $course->title = $request->title;
            $course->description = $request->description;
            $course->status = 'saved';
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
