<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DropUnusedTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::drop('useraccount');
        Schema::drop('client');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
      //
      Schema::create('useraccount', function (Blueprint $table) {
          $table->increments('UserID');
          $table->string('FirstName');
          $table->string('LastName');
          $table->string('PreferName');
          $table->datetime('DateofBirth');
          $table->string('Nationality');
          $table->string('Gender');
          $table->string('Mobile');
          $table->string('Email');
          $table->string('Who');
          $table->datetime('Created');

      });
      Schema::create('client', function (Blueprint $table) {

        $table->increments('UserID');
        $table->string('FirstName');
        $table->string('LastName');
        $table->string('PreferName');
        $table->datetime('DateofBirth');
        $table->string('Nationality');
        $table->string('Gender');
        $table->string('Mobile');
        $table->string('Email');
        $table->integer('ConsultantID');
        $table->string('UserType');
        $table->datetime('Created');

      });
    }
}
