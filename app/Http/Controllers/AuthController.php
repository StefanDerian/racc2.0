<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Account;
use JWTAuth;
use JWTAuthException;

class AuthController extends Controller
{
  private function getToken($email, $password){
     $token = null;
     //$credentials = $request->only('email', 'password');

     try {
         if (!$token = JWTAuth::attempt( ['email'=>$email, 'password'=>$password])) {
            //exit();
             return response()->json([
                 'response' => 'error',
                 'message' => 'Password or email is invalid',
                 'token'=>$token
             ]);
         }
     } catch (JWTAuthException $e) {
         return response()->json([
             'response' => 'error',
             'message' => 'Token creation failed',
         ]);
     }
     return $token;
 }
 public function login(Request $request){
     $user = \App\Account::where('email', $request->email)->get()->first();
     //change it to md5
     $md5ed = md5($request->password);
     if ($user && $md5ed == $user->password) // The passwords match...
     {
        //return response()->json(["ok"=>"ok"],201);
         $token = self::getToken($request->email, $md5ed);

         $user->auth_token = $token;
         $user->save();
         $response = ['success'=>true,'msg'=>'login successful redirecting', 'data'=>['userid'=>$user->UserID,'user_auth'=>$user->auth_token,'displayname'=>$user->DisplayName,'username'=>$user->UserName, 'email'=>$user->email,'usertype'=>$user->UserType]];
     }
     else
       $response = ['success'=>false,'msg'=>'Login Failed', 'data'=>'Record doesnt exists'];

     return response()->json($response, 201);
 }

 public function register(Request $request){
     $payload = [
         'password'=>md5($request->password),
         'email'=>$request->email,
         'name'=>$request->name,
         'auth_token'=> ''
     ];

     $user = new \App\Account($payload);
     if ($user->save())
     {

         $token = self::getToken($request->email, $request->password); // generate user token

         if (!is_string($token))  return response()->json(['success'=>false,'data'=>'Token generation failed'], 201);

         $user = \App\Account::where('email', $request->email)->get()->first();

         $user->auth_token = $token; // update user token

         $user->save();

         $response = ['success'=>true, 'data'=>['name'=>$user->name,'id'=>$user->id,'email'=>$request->email,'auth_token'=>$token]];
     }
     else
         $response = ['success'=>false, 'data'=>'Couldnt register user'];


     return response()->json($response, 201);
 }


 //for testing purpose only
 public function testlogin($email,$password){
     $user = \App\Account::where('email', $email)->get()->first();
     //change it to md5
     $md5ed = md5($password);
     if ($user && $md5ed == $user->password) // The passwords match...
     {
        //return response()->json(["ok"=>"ok"],201);
         $token = self::getToken($email, $md5ed);

         $user->auth_token = $token;
         $user->save();
         $response = ['success'=>true, 'data'=>['userid'=>$user,'auth_token'=>$user->auth_token,'displayname'=>$user->DisplayName,'username'=>$user->UserName, 'email'=>$user->email]];
     }
     else
       $response = ['success'=>false, 'data'=>'Record doesnt exists'];

     return response()->json($response, 201);
 }
}
