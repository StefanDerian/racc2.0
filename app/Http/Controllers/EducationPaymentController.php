<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\EducationPayment;



class EducationPaymentController extends Controller
{
    //
    public function index()
    {
        return EducationPayment::all();
    }

    public function show($eduId,Request $request)
    {
      $education_payment = EducationPayment::find($eduId)->orderBy('created_at', 'desc');
      $responses = [];
      if ($education_payment = $education_payment->get()) {
        $response = ['success'=>true, 'msg'=>"Successfully get education data",'education'=>$education_payment];
      }else{
        $response = ['success'=>false,'msg'=>"Failed get education data"];
      }
      return response()->json($response, 201);

    }

    public function store(Request $request)
    {
      $response = [];
      if ($inserted_payment = EducationPayment::create($request->all())) {
        $response = ['success'=>true, 'msg'=>"Successfully create new payment",'inserted_payment'=>$inserted_payment];
      }else{
        $response = ['success'=>false,'msg'=>"Failed create payment data"];
      }
      return response()->json($response, 201);

    }

    public function update($id, Request $request)
    {
        $education_payment = EducationPayment::findOrFail($id);
        $responses = [];
        if($education_payment->update($request->all())){
          $response = ['success'=>true, 'msg'=>"Successfully update new education payment data", 'data'=>$education_payment];
        }else{
          $response = ['success'=>false, 'msg'=>"Failed update new education data"];
        }
        return response()->json($response, 201);

    }

    public function delete(Request $request, $id)
    {
        $education_payment = EducationPayment::findOrFail($id);
        $education_payment->delete();

        return 204;
    }
}
