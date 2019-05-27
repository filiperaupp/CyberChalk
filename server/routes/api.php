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

Route::get('categories', 'CategoryController@index')
    ->middleware('auth:api');
Route::post('categories', 'CategoryController@store');
Route::delete('categories/{id}', 'CategoryController@destroy');
Route::put('categories/{id}', 'CategoryController@update');

Route::get('themes', 'ThemeController@index')
    ->middleware('auth:api','adminRole');
Route::get('themes-by-category/{id}', 'ThemeController@themeByCategory');
Route::post('themes', 'ThemeController@store');
Route::delete('themes/{id}', 'ThemeController@destroy');
Route::put('themes/{id}', 'ThemeController@update');


Route::post('teste', 'TestController@file');
Route::delete('teste', 'TestController@destroy');

//content-solicitation
Route::get('content-solicitations', 'ContentSolicitationController@index');
Route::get('content-solicitations/{id}', 'ContentSolicitationController@getById');
Route::post('content-solicitations', 'ContentSolicitationController@store');
Route::post('content-solicitations/teste', 'ContentSolicitationController@update');
Route::delete('content-solicitations/{id}', 'ContentSolicitationController@destroy');
Route::post('content-to-approve/{id}', 'ContentSolicitationController@sendToApprove'); //status 'pending'
//Content status control
Route::post('content-approve/{id}', 'ContentSolicitationController@contentApprove');
Route::post('content-recycle/{id}', 'ContentSolicitationController@contentRecycle');
Route::post('content-reject/{id}', 'ContentSolicitationController@contentReject');

//download files
Route::get('/downloadFile/{id}','FileController@download');
//donwload video
Route::get('/downloadVideo/{id}', 'VideoController@download');

//courses
Route::get('courses', 'CourseController@index');
Route::post('courses', 'CourseController@store');
Route::get('courses/{id}', 'CourseController@getById');
Route::put('courses/{id}', 'CourseController@update');
Route::delete('courses/{id}', 'CourseController@destroy');
Route::post('send-to-approve/{id}', 'CourseController@sendToApprove');
Route::post('change-status/{id}', 'CourseController@changeStatus');

//content to courses
Route::post('add-content-in-course', 'ContentToCourseController@addContent');
Route::get('contents-by-course/{id}', 'ContentToCourseController@contentsByCourse');
Route::delete('contents-by-course/{id}', 'ContentToCourseController@destroy');
Route::post('change-position', 'ContentToCourseController@changePosition');

