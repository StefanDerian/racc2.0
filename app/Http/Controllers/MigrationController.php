<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class MigrationController extends Controller
{
    //
    public function index()
    {

    }
    public function migrationDataApi($clientid)
    {
      //calculating the point scores data for handling the new pointtype data which has not been added
      $ptedata = DB::select("SELECT * FROM pointtype LEFT JOIN clientpoint ON pointtype.id = clientpoint.pointid AND clientpoint.clientid =".$clientid);
      //to check wether the data exists or not
      $notnull_ptedata = DB::select("SELECT * FROM pointtype LEFT JOIN clientpoint ON pointtype.id = clientpoint.pointid WHERE clientpoint.clientid =".$clientid);
      $responses = [];
      if($ptedata){
        $typedata = [];

        if(count($notnull_ptedata) == 0){
          //if the data does not exist yet
          $typedata = DB::table('pointtype')->get();
          //assign type with type data and data to empty array
          $response = ['success'=>true, 'data'=>[], 'type'=>$typedata];
        }else{
          //if the data exists

          // assign the type to $ptedata and type to empty array
          $response = ['success'=>true, 'data'=>$ptedata, 'type'=>[]];
        }

      }else{
        $response = ['success'=>false];
      }
      return response()->json($response, 201);
    }

    public function insertApi(Request $request)
    {
      $response = [];
      if (DB::table('clientpoint')->insert($request->all())) {
        $response = ['success'=>true, 'msg'=>"Successfully create new pte data"];
      }else{
        $response = ['success'=>false,'msg'=>"Failed create ptedata"];
      }
      return response()->json($response, 201);

    }

    public function updateApi($clientid,Request $request)
    {
        $response = [];
        $update_data = $request->all();
        $success = true;
        // iterating each of the data one by one because laravel only allow 1 data update at a time
        foreach ($update_data as $value) {
          //handling new pointtype data which has not been added to the clientpoint before by inserting and initialize the value to 0
          if(count(DB::table('clientpoint')->where('pointid',$value['pointid'])->get()) == 0){
            DB::table('clientpoint')->insert(['pointid'=>$value['pointid'],'current'=>0,'goal'=>0,'clientid'=>$clientid]);
          }
          if(DB::table('clientpoint')
                  ->where('clientid', $clientid)
                  ->where('pointid',$value['pointid'])
                  ->update($value)){
              $success = true;
          }else{
              $success = false;
          }


        }
        $response = ['success'=>true, 'msg'=>"Successfully update new pte data"];
        // if (!$success) {
        //   $response = ['success'=>true, 'msg'=>"Successfully update new pte data"];
        // }else{
        //   $response = ['success'=>false,'msg'=>"Failed create ptedata"];
        // }
        return response()->json($response, 201);


    }

    public function sendEmail($clientid,Request $request)
    {
      $client = App\Client::find($clientid);
      //print_r($client);
      //calculating the pte scores data for handling the new pointtype data which has not been added
      $ptedata = DB::select("SELECT * FROM pointtype LEFT JOIN clientpoint ON pointtype.id = clientpoint.pointid AND clientpoint.clientid =".$clientid);
      $fullname = $client["FirstName"]." ".$client["LastName"];
      $from = new From($request["sender"]["email"], $request["sender"]["name"]);
      $tos = [
          new To(
              $client["Email"],
              $fullname,
              [
                  '-client-' => $fullname,
                  '-feedback-' => $request["feedback"],
                  '-DisplayName-' => $request["sender"]["name"]
              ]
          )
      ];
      $pte_html = "";
      //$subject = new Subject("I'm replacing the subject tag");
      $pte_html .= '<table class ="table" width="100%" style="border-collapse:collapse" cellpadding="13">';

            $pte_html .= '<tr class = "info">
            <th></th>
            <th>Skills</th>
            <th>Current Points</th>
            <th>Notes</th>
            <th>Goal Points</th>
            </tr>';
            foreach ($ptedata as $key => $value) {
              $pte_html .= '<tr>';
              $pte_html .= "<td>".$value->id ."</td>";
              $pte_html .= "<td>".$value->name ."</td>";
              $pte_html .= "<td>".$value->current."</td>";
              $pte_html .= "<td>".$value->note."</td>";
              $pte_html .= '<td>';
              $pte_html .=  $value->goal;
              $pte_html .= '</td>';
              $pte_html .= '</tr>';


            }
            $pte_html .= '</table>';
        $subject = new Subject("Your Migration Points Update and Feedback");
        $plainTextContent = new PlainTextContent(
            "I'm replacing the **body tag**"
        );
        $htmlContent = new HtmlContent(
            $pte_html
        );

        $email = new SendgridMail(
            $from,
            $tos,
            $subject,
            $plainTextContent,
            $htmlContent
        );

        $email->setTemplateId("1fa7e21b-9153-4e42-96e4-db52aa1caf05");
        $sendgrid = new \SendGrid(getenv('SENDGRID_API_KEY'));
        $response = ['success'=>true, 'msg'=>"Successfully send the email"];
        try {
            $response_sendgrid = $sendgrid->send($email);
            $response = ['success'=>true, 'msg'=>"Successfully send the email"];
        } catch (Exception $e) {
           $response = ['success'=>false, 'msg'=>$e->getMessage()];
        }
      return response()->json($response, 201);


    }

}
