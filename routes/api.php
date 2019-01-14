<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Account;
use App\Client;
use App\Note;

use App\Mail\EmailMigration;

use \SendGrid\Mail\From as From;
use \SendGrid\Mail\To as To;
use \SendGrid\Mail\Subject as Subject;
use \SendGrid\Mail\PlainTextContent as PlainTextContent;
use \SendGrid\Mail\HtmlContent as HtmlContent;
use \SendGrid\Mail\Mail as SendgridMail;

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
//single client data to be displayed in the detail page
Route::get('/singleclient/{id}', function($id){

    $clients = DB::table('user')->where("UserID",$id);

    $clients =$clients->get();

    if($clients){
      $response = ['success'=>true, 'data'=>$clients[0]];
    }else{
      $response = ['success'=>false,'msg'=>"some error occurred"];
    }

    return response()->json($response, 201);
});
//client data to be displayed in the home page
Route::get('/clientdata/{consultantId}', function($consultantId){

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
    $response = ['success'=>true, 'data'=>$clients];
    return response()->json($response, 201);
});
//updating client data
Route::put('/updateclient/{id}', function($id,Request $data){

    $client = DB::table('user')->where("UserID",$id);
    //all is to convert data to array
    if($client->update($data->all())){
      $response = ['success'=>true,'msg'=>'success updating client data', 'data'=>$data];
    }else{
      $response = ['success'=>false,'msg' =>'Failed updating client data', 'data'=>$data];
    }
    return response()->json($response, 201);
});
//looking for spesific client data
Route::post('/clientCustomData', function(Request $request){

    $clients = DB::table('user')->where($request->all());
    $response = [];
    if($clients = $clients->get()){
      $response= ['success'=>true, 'data'=>$clients];
    }else{
      $response= ['success'=>false];
    }

    return response()->json($response, 201);
});
//looking for spesific client data
Route::post('/clientcustomdata/{id}', function($id,Request $request){

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
});
//testing purpose
Route::post('/clientcustomdata2/{id}', function($id,Request $request){

    //if it comes to creating client it doe not need id but if it comes to update it need

    $response= ['success'=>true, 'id' =>$id,'data'=>$request->all()];
    return response()->json($response, 201);
});
//creating client data
Route::post('/createclient', function(Request $data){
    //all is to convert data to array
    if($created = App\Client::create($data->all())){
      $response = ['success'=>true,'msg'=>'success creating client data', 'data'=>$created->UserID];
    }else{
      $response = ['success'=>false,'msg' =>'Failed creating client data'];
    }
    return response()->json($response, 201);
});
//creating client data
Route::post('/createemployee', function(Request $data){
    //all is to convert data to array
    $data = $data->all();
    $data["password"] = md5($data["password"]);
    if($created = App\Account::create($data)){
      $response = ['success'=>true,'msg'=>'success creating employee data', 'data'=>$created->UserID];
    }else{
      $response = ['success'=>false,'msg' =>'Failed creating employee data'];
    }
    return response()->json($response, 201);
});
//updating client data
Route::put('/updateemployee/{id}', function($id,Request $data){
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
});

//single client data to be displayed in the detail page
Route::get('/singleemployee/{id}', function($id){

    $employee = DB::table('account')->where("UserID",$id);

    $employee =$employee->get();

    if($employee){
      $response = ['success'=>true, 'data'=>$employee[0]];
    }else{
      $response = ['success'=>false,'msg'=>"some error occurred"];
    }

    return response()->json($response, 201);
});

//get employee data
Route::get('/employeedata/{not_manager}', function($not_manager){

    $employees = DB::table('account');
    if($not_manager){
      $employees->where("UserType","!=","MANAGER");
    }
    $employees = $employees->get();
    $response = ['success'=>true, 'data'=>$employees];
    return response()->json($response, 201);
});

// //get employee data
// Route::post('/employeecustomdata/{not_manager}', function($not_manager){
//
//     $employees = DB::table('account');
//     if($not_manager){
//       $employees->where("UserType","!=","MANAGER");
//     }
//     $employees = $employees->get();
//     $response = ['success'=>true, 'data'=>$employees];
//     return response()->json($response, 201);
// });

//get notes of one client
Route::get('/note/{clientid}', function($clientid){

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
});
//update note
Route::put('/updatenote/{id}', function($id,Request $request){

    $notes = App\Note::Where("ID",$id);
    $responses = [];
    if($notes->update($request->all())){
      $response = ['success'=>true, 'data'=>$notes];
    }else{
      $response = ['success'=>false];
    }
    return response()->json($response, 201);
});
// create note based on the one who write , content and the date
Route::post('/createnote', function(Request $request){

    if(App\Note::create($request->all())){
      $response = ['success'=>true, 'msg'=>"Successfully create note"];
    }else{
      $response = ['success'=>false,'msg'=>"Failed create note"];
    }
    return response()->json($response, 201);
});

//get pte data of one client
Route::get('/migration/{clientid}', function($clientid){
    //calculating the pte scores data for handling the new pointtype data which has not been added
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
});
//get education data of one client
Route::get('/education/{clientid}', function($clientid){
  $education = DB::table('education')->where("UserID",$clientid);
  if ($education = $education->get()) {
    $response = ['success'=>true, 'msg'=>"Successfully get education data",'education'=>$education];
  }else{
    $response = ['success'=>false,'msg'=>"Failed create ptedata"];
  }
  return response()->json($response, 201);
});
//insert education data of one client
Route::post('/educationinsert', function(Request $request){
  $education = DB::table('education');
  if ($education->insert($request->all())) {
    $response = ['success'=>true, 'msg'=>"Successfully insert new education data"];
  }else{
    $response = ['success'=>false,'msg'=>"Failed create education data"];
  }
  return response()->json($response, 201);
});
//update education data
Route::put('/educationupdate/{id}', function($id,Request $request){

    $education_update = DB::table('education')->where("id",$id);
    $responses = [];
    if($education_update->update($request->all())){
      $response = ['success'=>true, 'msg'=>"Successfully update new education data", 'data'=>$education_update];
    }else{
      $response = ['success'=>false, 'msg'=>"Failed update new education data"];
    }
    return response()->json($response, 201);
});
//get The education Payments based on Id, 1 university application can have more than 1 payments depends on the plan is it weekly or monthly
Route::get('/educationPayment/{eduId}', 'EducationPaymentController@show');
//create new education payment data
Route::post('/educationPaymentInsert','EducationPaymentController@store');
//update education payment data
Route::put('/educationPaymentUpdate/{id}','EducationPaymentController@update');




//create new pte data
Route::post('/migrationinsert',function(Request $request){
  $response = [];
  if (DB::table('clientpoint')->insert($request->all())) {
    $response = ['success'=>true, 'msg'=>"Successfully create new pte data"];
  }else{
    $response = ['success'=>false,'msg'=>"Failed create ptedata"];
  }
  return response()->json($response, 201);
});

//update pte data
Route::put('/migrationupdate/{clientid}',function($clientid,Request $request){
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
});


//route used for sending an email for migration purposes
Route::post('/sendmigrationemail/{clientid}',function($clientid,Request $request){
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
});

Route::group(['middleware' => ['api-header']], function () {

    // The registration and login requests doesn't come with tokens
    // as users at that point have not been authenticated yet
    // Therefore the jwtMiddleware will be exclusive of them
    Route::post('user/login', 'AuthController@login');
    Route::post('user/register', 'AuthController@register');
});
