<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\ContentSolicitation;
use App\Course;
use App\Theme;
use App\Category;
use App\User;
use App\Http\Controllers\LikeController;
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

    public function getLastestCourses(){
        $latestCourses = Course::select('id','title','user_id','theme_id')->where('status','approved')->orderBy('id','desc')->take(4)->get();

        $courses = array();
        if (isset($latestCourses) && sizeOf($latestCourses)) {
            foreach ($latestCourses as $course) {
                $course->theme = Theme::select('id','name','category_id')->find($course->theme_id);
                $course->category = Category::select('id','name')->find($course->theme->category_id);
                $course->creator = User::select('name')->find($course->user_id);
                array_push($courses, $course);
            }
        }

        return json_encode($courses);
    }

    public function countCourses($id){
        $count = Course::where('user_id',$id)->count();
        return $count;
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

    public function getCourseFullContents($id){
        $contentController = new ContentSolicitationController();
        $course = Course::find($id);

        if (isset($course)){
            $course->contents = $contentController->fullContentsByCourse($id);
        }

        return json_encode($course);
    }

    public function getByThemeId($id){
        $user = Auth::user();
        $likeController = new LikeController();
        $courses = Course::where('theme_id',$id)->get();
        if(isset($courses) && sizeOf($courses)>0) {
            foreach ($courses as $course) {
                $course->likes = $likeController->likesInCourse($course->id);
                $course->isLike = $likeController->isLikeCourse($user->id, $course->id);
                $course->creator = User::find($course->user_id)->name;
            }
        }
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
            return json_encode('ok',200);
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

    public function getCourseInfo($idCourse){
        $course = Course::find($idCourse);
        $course->theme = Theme::find($course->theme_id);
        $course->category = Category::find($course->theme->category_id);
        return $course;
    }
}
