<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EducationPayment extends Model
{
    //
    protected $guarded = [];
    protected $table = "education_payment";

    public function education()
    {
        return $this->belongsTo('App\Education');
    }

}
