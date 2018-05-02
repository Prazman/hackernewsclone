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
    return view('list');
});


Route::get('/links/create', function () {
    return view('links.create');
});

Route::get('/comments/{link_id}/create', function ($link_id) {
    return view('comments.create',['link_id'=>$link_id]);
});
