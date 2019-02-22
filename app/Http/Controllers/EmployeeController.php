<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Account;


class EmployeeController extends Controller
{
    //
    public function getSingleData($id){

        $employee = DB::table('account')->where("UserID",$id);

        $employee =$employee->get();

        if($employee){
          $response = ['success'=>true, 'data'=>$employee[0]];
        }else{
          $response = ['success'=>false,'msg'=>"some error occurred"];
        }

        return response()->json($response, 201);
    }
    public function getAllData($not_manager){
      $employees = DB::table('account');
      if($not_manager){
        $employees->where("UserType","!=","MANAGER");
      }
      $employees = $employees->get();
      $response = ['success'=>true, 'data'=>$employees];
      return response()->json($response, 201);
    }
    public function createApi(Request $data){
      $data = $data->all();
      $data["password"] = md5($data["password"]);
      if($created = \App\Account::create($data)){
        $response = ['success'=>true,'msg'=>'success creating employee data', 'data'=>$created->UserID];
      }else{
        $response = ['success'=>false,'msg' =>'Failed creating employee data'];
      }
      return response()->json($response, 201);
    }
    public function updateApi($id,Request $data){
      $data = $data->all();
      if(isset($data["password"])){
        $data["password"] = md5($data["password"]);
      }
      $employee = DB::table('account')->where("UserID",$id);
      //all is to convert data to array
      if($employee->update($data)){
        $response = ['success'=>true,'msg'=>'success updating employee data', 'data'=>$employee];
      }else{
        $response = ['success'=>false,'msg' =>'Failed updating employee data', 'data'=>$employee];
      }
      return response()->json($response, 201);
    }
}
