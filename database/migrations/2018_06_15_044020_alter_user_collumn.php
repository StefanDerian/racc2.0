<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterUserCollumn extends Migration
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
          $table->date('duedate')->nullable()->change();
          $table->date('Pexpiry')->nullable()->change();
          $table->date('Vexpiry')->nullable()->change();
          $table->date('lastContacted')->nullable()->change();
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
