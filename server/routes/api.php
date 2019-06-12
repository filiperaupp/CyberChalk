<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('auth')->group(function() {
    Route::post('registro', 'AuthController@register');
    Route::post('login', 'AuthController@login');
    Route::middleware('auth:api')->group(function() {
        Route::post('logout', 'AuthController@logout');
    });
});
Route::get('produtos', 'TestController@index')
    ->middleware('auth:api');

Route::post('user-solicitation', 'UserSolicitationController@store');
Route::post('user-solicitation/{id}', 'UserSolicitationController@updateStatus');
Route::get('user-solicitations/pending', 'UserSolicitationController@index');
Route::get('user-solicitations', 'UserSolicitationController@getAll');

Route::get('users', 'UserController@index');
Route::delete('users/{id}', 'UserController@destroy');
Route::post('users/{id}', 'UserController@updateType');
//profile photo
Route::post('profile-photo','UserController@changeProfilePhoto')->middleware('auth:api');
//update name and email of USER
Route::put('user-update', 'UserController@updateUser')->middleware('auth:api');
//top five
Route::get('top-users', 'UserController@getTopFive');

Route::get('categories', 'CategoryController@index')
    ->middleware('auth:api');
Route::post('categories', 'CategoryController@store');
Route::get('categories/{id}', 'CategoryController@getById');
Route::delete('categories/{id}', 'CategoryController@destroy');
Route::put('categories/{id}', 'CategoryController@update');

Route::get('themes', 'ThemeController@index')
    ->middleware('auth:api','adminRole');
Route::get('themes/{id}', 'ThemeController@getById');
Route::get('themes-by-category/{id}', 'ThemeController@themeByCategory');
Route::post('themes', 'ThemeController@store');
Route::delete('themes/{id}', 'ThemeController@destroy');
Route::put('themes/{id}', 'ThemeController@update');


Route::post('teste', 'TestController@file');
Route::delete('teste', 'TestController@destroy');

//content-solicitation
Route::get('content-solicitations', 'ContentSolicitationController@index')->middleware('auth:api');
Route::get('content-solicitations/{id}', 'ContentSolicitationController@getById');
Route::post('content-solicitations', 'ContentSolicitationController@store')->middleware('auth:api');
Route::post('content-solicitations/teste', 'ContentSolicitationController@update');
Route::delete('content-solicitations/{id}', 'ContentSolicitationController@destroy');
Route::get('content-by-user', 'ContentSolicitationController@getContentsByUser')->middleware('auth:api');
//Content status control
Route::post('content-change-status/{id}', 'ContentSolicitationController@contentChangeStatus');
//last contents
Route::get('lastest-contents', 'ContentSolicitationController@getLastestContents');

//download files
Route::get('/downloadFile/{id}','FileController@download');
//donwload video
Route::get('/downloadVideo/{id}', 'VideoController@download');

//courses
Route::get('courses', 'CourseController@index')->middleware('auth:api');
Route::post('courses', 'CourseController@store')->middleware('auth:api');
Route::get('courses/{id}', 'CourseController@getById')->middleware('auth:api');
Route::put('courses/{id}', 'CourseController@update');
Route::delete('courses/{id}', 'CourseController@destroy');
Route::post('send-to-approve/{id}', 'CourseController@sendToApprove');
Route::post('change-status/{id}', 'CourseController@changeStatus');
Route::get('courses-by-user', 'CourseController@allCoursesByUser')->middleware('auth:api');
Route::get('course-full-contents/{id}', 'CourseController@getCourseFullContents');
//last courses
Route::get('lastest-courses','CourseController@getLastestCourses');

//content to courses
Route::post('add-content-in-course', 'ContentToCourseController@addContent')->middleware('auth:api');
Route::get('contents-by-course/{id}', 'ContentToCourseController@contentsByCourse');
Route::delete('contents-by-course/{id}', 'ContentToCourseController@destroy');
Route::post('change-position', 'ContentToCourseController@changePosition');
//With status done or not
Route::get('contents-by-course-is-done/{id}', 'ContentToCourseController@contentsByCourseWithProgress')
    ->middleware('auth:api');



//list material of a theme
Route::get('contents-by-theme/{id}', 'ContentSolicitationController@getByThemeId')->middleware('auth:api');
Route::get('courses-by-theme/{id}', 'CourseController@getByThemeId')->middleware('auth:api');

//Progress
Route::post('progress', 'ProgressController@store')->middleware('auth:api');
Route::post('progress-undo', 'ProgressController@destroy')->middleware('auth:api');
Route::get('courses-in-progress', 'ProgressController@getPercentage')->middleware('auth:api');

//like
Route::post('like', 'LikeController@store')->middleware('auth:api');
Route::post('unlike', 'LikeController@destroy')->middleware('auth:api');

//get user logged
Route::get('user-logged','AuthController@getUser')->middleware('auth:api');


