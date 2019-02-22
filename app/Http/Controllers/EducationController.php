<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Education;
use Illuminate\Support\Facades\DB;


class EducationController extends Controller
{
    //
    public function index()
    {
        return Education::all();
    }

    public function getSingleEducationData($id)
    {
        return Education::find($id);
    }
    public function getSingleEducationDataApi($clientid){
      $education = DB::table('education')->where("UserID",$clientid);
      if ($education = $education->get()) {
        $response = ['success'=>true, 'msg'=>"Successfully get education data",'education'=>$education];
      }else{
        $response = ['success'=>false,'msg'=>"Failed create ptedata"];
      }
      return response()->json($response, 201);
    }
    public function createApi(Request $request){
      $education = DB::table('education');
      if ($education->insert($request->all())) {
        $response = ['success'=>true, 'msg'=>"Successfully insert new education data"];
      }else{
        $response = ['success'=>false,'msg'=>"Failed create education data"];
      }
      return response()->json($response, 201);
    }
    public function updateApi($id,Request $request){

        $education_update = DB::table('education')->where("id",$id);
        $responses = [];
        if($education_update->update($request->all())){
          $response = ['success'=>true, 'msg'=>"Successfully update new education data", 'data'=>$education_update];
        }else{
          $response = ['success'=>false, 'msg'=>"Failed update new education data"];
        }
        return response()->json($response, 201);
    }





    public function store(Request $request)
    {
        return Education::create($request->all());
    }

    public function update(Request $request, $id)
    {
        $education = Education::findOrFail($id);
        $education->update($request->all());

        return $education;
    }

    public function delete(Request $request, $id)
    {
        $education = Education::findOrFail($id);
        $education->delete();

        return 204;
    }
}
