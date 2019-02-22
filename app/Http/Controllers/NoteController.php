<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class NoteController extends Controller
{
    //
    public function getClientsNotesApi($clientid){

        $notes = DB::table('contact')
            ->join('account','contact.writer', '=', 'account.UserID')
            ->where('contact.UserID', '=', $clientid);
        $responses = [];
        if($notes = $notes->get()){
          $response = ['success'=>true, 'data'=>$notes];
        }else{
          $response = ['success'=>false];
        }
        return response()->json($response, 201);
    }
    public function updateApi($id,Request $request){

        $notes = App\Note::Where("ID",$id);
        $responses = [];
        if($notes->update($request->all())){
          $response = ['success'=>true, 'data'=>$notes];
        }else{
          $response = ['success'=>false];
        }
        return response()->json($response, 201);
    }
    public function createApi(Request $request){

        if(App\Note::create($request->all())){
          $response = ['success'=>true, 'msg'=>"Successfully create note"];
        }else{
          $response = ['success'=>false,'msg'=>"Failed create note"];
        }
        return response()->json($response, 201);
    }
}
