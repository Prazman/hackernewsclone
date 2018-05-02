<?php

use Illuminate\Http\Request;
use App\Link as Links;
use App\Comment as Comments;


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

Route::get('/links', function (Request $request) {
	$links = Links::all();
	return response()->json($links);
});

Route::post('/links/create', function (Request $request) {
	$link = Links::create($request->all());
	return response()->json('ok');
});


Route::post('/comments/create', function (Request $request) {
	$link = Links::create($request->all());
	return response()->json('ok');
});

Route::get('/comments/{link_id}/list', function ($link_id) {
	$comments = Comments::where('link_id',$link_id)->get();
	return response()->json($comments);
});


