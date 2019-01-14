<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Education extends Model
{
    //
    protected $guarded = [];
    protected $table = "education";
    //public $timestamps = false;
    public function payments()
    {
        return $this->hasMany('App\EducationPayment');
    }
}
