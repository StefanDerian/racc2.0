<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PointtypeAddSpecialEducation extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //add special education on pointtype table
        DB::table('pointtype')->insert(
          ['name' => 'Special Education', 'note' => '10 points','formname'=>'SpecialEducation']
        );
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
