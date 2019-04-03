<?php

use Illuminate\Http\Request;

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