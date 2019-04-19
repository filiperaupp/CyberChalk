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
Route::get('user-solicitations', 'UserSolicitationController@index');