<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Route;

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

// Auth routes
Route::group([
    'middleware' => 'api',
    'namespace'  => 'App\Http\Controllers',
    'prefix'     => 'auth',
], function () {
    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('register', 'AuthController@register');
    Route::post('me', 'AuthController@me');
});

Route::get('/health', function () {
    return [
        "time" => time(),
    ];
})->name('health');

/**
 * We can use this to test our cloudformation correctly caches
 */
Route::middleware('cache.headers:public;max_age=3600;etag')->group(function () {
    Route::get('/health/cache', function () {
        return ["cached" => 3600];
    })->name("cache");
});

Route::get('/info', function () {
    if (App::environment("APP_ENV") === "local") {
        return phpinfo();
    }
})->name('phpinfo');
