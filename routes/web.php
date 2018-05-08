<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



Route::get('/', function () {
    return view('welcome');
});

//the route are made for handling refresh event
Route::get('/Employee', function () {
    return view('welcome');
});
Route::get('/Login', function () {
    return view('welcome');
});
//the end of the route made

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::get('/testAuth/{email}/{password}', 'TestController@testAuthLogin')->name('home');
