<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    //
    protected $table = 'user';
    protected $primaryKey = 'UserID';

    public function consultant(){

      return $this->belongsTo('App\Account','ConsultantID', 'UserID');

    }
    public function notes(){

      return $this->hasMany('App\Note','UserID');

    }




}
