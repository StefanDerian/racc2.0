<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MakeAllUsercolumnNullable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('user', function($table)
        {
          // $table->date('duedate')->default("0001-01-01")->change();
          // $table->date('Pexpiry')->default("0001-01-01")->change();
          // $table->date('Vexpiry')->default("0001-01-01")->change();
          // $table->date('lastContacted')->default("0001-01-01")->change();
          // $table->date('DateofBirth')->default("0001-01-01")->change();
          $table->string('FirstName', 100)->default(" ")->nullable()->change();
          $table->string('LastName', 100)->default(" ")->nullable()->change();
          $table->string('PreferName', 100)->default(" ")->nullable()->change();
          $table->string('Nationality', 100)->default(" ")->nullable()->change();
          $table->string('Gender', 100)->default(" ")->nullable()->change();
          $table->string('Mobile', 100)->default(" ")->nullable()->change();
          $table->string('Email', 100)->default(" ")->nullable()->change();
          $table->integer('ConsultantID')->default(0)->nullable()->change();
          $table->string('UserType', 100)->default(" ")->nullable()->change();
          $table->string('Course', 100)->default(" ")->nullable()->change();
          $table->string('Uni', 100)->default(" ")->nullable()->change();
          $table->string('Uni_Compl', 100)->default(" ")->nullable()->change();
          $table->string('Visa', 100)->default(" ")->nullable()->change();
          $table->string('Passport', 100)->default(" ")->nullable()->change();
          $table->string('CurrentAddress', 100)->default(" ")->nullable()->change();
          $table->string('Csuburb', 100)->default(" ")->nullable()->change();
          $table->string('Cpostcode', 100)->default(" ")->nullable()->change();
          $table->string('Cstate', 100)->default(" ")->nullable()->change();
          $table->string('Ccountry', 100)->default(" ")->nullable()->change();
          $table->string('HomeAddress', 100)->default(" ")->nullable()->change();
          $table->string('Hcity', 100)->default(" ")->nullable()->change();
          $table->string('Hstate', 100)->default(" ")->nullable()->change();
          $table->string('Hcountry', 100)->default(" ")->nullable()->change();
          $table->string('Hpostcode', 100)->default(" ")->nullable()->change();
          $table->integer('CurrentPointTest')->default(0)->nullable()->change();
          $table->integer('GoalPointTest')->default(0)->nullable()->change();
          $table->string('Comment', 100)->default(" ")->nullable()->change();
          $table->string('CurrentStatus', 100)->default(" ")->nullable()->change();
          $table->string('know', 100)->default(" ")->nullable()->change();
          $table->integer('urgent')->default(0)->nullable()->change();
          $table->string('wechat', 100)->default(" ")->nullable()->change();
          $table->string('prevStudy', 100)->default(" ")->nullable()->change();
          $table->string('service', 100)->default(" ")->nullable()->change();
          $table->string('prevUni', 100)->default(" ")->nullable()->change();
          $table->string('prevCountry', 100)->default(" ")->nullable()->change();
          $table->string('prevCountry', 100)->default(" ")->nullable()->change();
        });
}

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
