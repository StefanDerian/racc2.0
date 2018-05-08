<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\AuthController;

class TestController extends Controller
{
    //
    private $auth_service;

    public function __construct()
    {
            $this->auth_service = new AuthController();
    }
    public function testAuthLogin($email,$password){
      $this->auth_service->testLogin($email,$password);




    }
}
