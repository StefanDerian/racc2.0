<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UsersController extends Controller
{
    //

  public function createApi(Request $data){
    if($created = App\Client::create($data->all())){
      $response = ['success'=>true,'msg'=>'success creating client data', 'data'=>$created->UserID];
    }else{
      $response = ['success'=>false,'msg' =>'Failed creating client data'];
    }
    return response()->json($response, 201);
  }

  public function userData($consultantId){

      $clients = DB::table('user');
      $clients =$clients
              ->selectRaw(DB::raw("user.UserID as clientId, FirstName, LastName, DateofBirth, Nationality, Mobile, user.Email, CurrentStatus, Vexpiry, Course, tim, account.DisplayName as DisplayName, urgent, know, account.UserID,duedate,user.Created,uni_Compl"))
              ->leftjoin(DB::raw("(SELECT MAX(Time) as tim, UserID FROM `contact` GROUP BY UserID) con"), 'user.UserID', '=', 'con.UserID')
              ->leftjoin('account', 'account.UserID', '=', 'user.ConsultantID')
              ->orderBy('user.created','Desc');
      if(!empty($consultantId)){
        $clients =$clients->where("ConsultantID", $consultantId);
      }
      $clients =$clients->get();
      return $clients;
  }


  public function userDataApi($consultantId){
    $clients = $this->userData($consultantId);
    $response = ['success'=>true, 'data'=>$clients];
    return response()->json($response, 201);
  }
  public function singleUserApi($id){
    $clients = DB::table('user')->where("UserID",$id);

    $clients =$clients->get();

    if($clients){
      $response = ['success'=>true, 'data'=>$clients[0]];
    }else{
      $response = ['success'=>false,'msg'=>"some error occurred"];
    }

    return response()->json($response, 201);
  }

  public function updateUserApi($id,Request $data){
    $client = DB::table('user')->where("UserID",$id);
    //all is to convert data to array
    if($client->update($data->all())){
      $response = ['success'=>true,'msg'=>'success updating client data', 'data'=>$data];
    }else{
      $response = ['success'=>false,'msg' =>'Failed updating client data', 'data'=>$data];
    }
    return response()->json($response, 201);
  }
  public function usersQueryApi($id,Request $request){
    $clients = DB::table('user')->where($request->all());

    //if it comes to creating client it doe not need id but if it comes to update it need
    if(!empty($id)){
      $clients->where("UserID","<>",$id);
    }

    $response = [];
    if($clients = $clients->get()){
      $response= ['success'=>true, 'data'=>$clients];
    }else{
      $response= ['success'=>false];
    }

    return response()->json($response, 201);
  }





}
