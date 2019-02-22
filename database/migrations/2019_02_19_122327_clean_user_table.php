<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CleanUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('user', function (Blueprint $table) {
            $table->dropColumn(['PreferName','Gender','UserType','Csuburb','Hcity','Hstate','Hcountry','Hpostcode',
                                'CurrentPointTest','GoalPointTest','Comment']);
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
        Schema::table('user', function (Blueprint $table) {
            $table->string('PreferName');
            $table->string('Gender');
            $table->string('UserType');
            $table->string('Csuburb');
            $table->string('Hcity');
            $table->string('Hstate');
            $table->string('Hcountry');
            $table->string('Hpostcode');
            $table->string('CurrentPointTest');
            $table->string('GoalPointTest');
            $table->string('Comment');

        });
    }
}
