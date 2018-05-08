<?php

use Illuminate\Http\Request;
use App\Account;
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

Route::group(['middleware' => ['jwt.auth','api-header']], function () {

    // all routes to protected resources are registered here

});
Route::get('/account', function(){
    $users = App\Account::all();
    $response = ['success'=>true, 'data'=>$users];
    return response()->json($response, 201);
});
Route::get('/clientdata', function(){

    $clients = DB::table('user');
    $clients =$clients
            ->selectRaw(DB::raw("user.UserID as clientId, FirstName, LastName, PreferName, DateofBirth, Nationality, Gender, Mobile, user.Email, CurrentStatus, Vexpiry, Course, tim, account.DisplayName as DisplayName, urgent, know, account.UserID,duedate,user.Created"))
            ->leftjoin(DB::raw("(SELECT MAX(Time) as tim, UserID FROM `contact` GROUP BY UserID) con"), 'user.UserID', '=', 'con.UserID')
            ->leftjoin('account', 'account.UserID', '=', 'user.ConsultantID')
            ->orderBy('user.created','Desc')->get();
    $response = ['success'=>true, 'data'=>$clients];
    return response()->json($response, 201);
});

Route::put('/updateclient/{id}/{data}', function($id,$data){

    //unserialized the data



    $unserialized = json_decode($data, true);

    $client = App\Client::where("UserID",$id);



    if($client->update($unserialized)){
      $response = ['success'=>true,'msg'=>'success updating client data', 'data'=>$unserialized];
    }else{
      $response = ['success'=>false,'msg' =>'success updating client data', 'data'=>$unserialized];
    }



    return response()->json($response, 201);
});


Route::group(['middleware' => ['api-header']], function () {

    // The registration and login requests doesn't come with tokens
    // as users at that point have not been authenticated yet
    // Therefore the jwtMiddleware will be exclusive of them
    Route::post('user/login', 'AuthController@login');
    Route::post('user/register', 'AuthController@register');
});
