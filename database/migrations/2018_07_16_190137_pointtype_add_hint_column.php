<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PointtypeAddHintColumn extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //creating hint type at pointtype table for hint on hover
        Schema::table('pointtype', function (Blueprint $table) {
          $table->string('hint');
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
        Schema::table('pointtype', function (Blueprint $table) {
          $table->dropColumn(['hint']);
        });

    }
}
