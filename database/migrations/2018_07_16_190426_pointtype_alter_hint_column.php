<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PointtypeAlterHintColumn extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //altering hint column type to text
        Schema::table('pointtype', function (Blueprint $table) {
          $table->text('hint')->change();
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
        //altering hint column type to text
        Schema::table('pointtype', function (Blueprint $table) {
          $table->string('hint')->change();
        });
    }
}
