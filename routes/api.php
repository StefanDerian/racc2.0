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
Route::get('/singleclient/{id}','UsersController@singleUserApi');
//client data to be displayed in the home page
Route::get('/clientdata/{consultantId}', 'UsersController@userDataApi');
//updating client data
Route::put('/updateclient/{id}', 'UsersController@updateUserApi');
//looking for spesific client data
//Route::post('/clientCustomData', 'UsersController@usersQueryApi');

//looking for spesific client data
Route::post('/clientcustomdata/{id}','UsersController@usersQueryApi');
//creating client data
Route::post('/createclient', 'UsersController@createApi');


//creating client data
Route::post('/createemployee', 'EmployeeController@createApi');
//updating client data
Route::put('/updateemployee/{id}', 'EmployeeController@updateApi');

//single client data to be displayed in the detail page
Route::get('/singleemployee/{id}', 'EmployeeController@getSingleData');

//get employee data
Route::get('/employeedata/{not_manager}', 'EmployeeController@getAllData');

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
Route::get('/note/{clientid}', 'NoteController@getClientsNotesApi');
//update note
Route::put('/updatenote/{id}', 'NoteController@updateApi');
// create note based on the one who write , content and the date
Route::post('/createnote', 'NoteController@createApi');


//get education data of one client
Route::get('/education/{clientid}','EducationController@getSingleEducationDataApi' );
//insert education data of one client
Route::post('/educationinsert', 'EducationController@createApi');
//update education data
Route::put('/educationupdate/{id}', 'EducationController@updateApi');
//get The education Payments based on Id, 1 university application can have more than 1 payments depends on the plan is it weekly or monthly
Route::get('/educationPayment/{eduId}', 'EducationPaymentController@show');
//create new education payment data
Route::post('/educationPaymentInsert','EducationPaymentController@store');
//update education payment data
Route::put('/educationPaymentUpdate/{id}','EducationPaymentController@update');
//get migration data of one client
Route::get('/migration/{clientid}', 'MigrationController@migrationDataApi');
//create new pte data
Route::post('/migrationinsert','MigrationController@insertApi');
//update pte data
Route::put('/migrationupdate/{clientid}','MigrationController@updateApi');
//route used for sending an email for migration purposes
Route::post('/sendmigrationemail/{clientid}','MigrationController@sendEmail');

Route::group(['middleware' => ['api-header']], function () {

    // The registration and login requests doesn't come with tokens
    // as users at that point have not been authenticated yet
    // Therefore the jwtMiddleware will be exclusive of them
    Route::post('user/login', 'AuthController@login');
    Route::post('user/register', 'AuthController@register');
});
