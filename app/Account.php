<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Tymon\JWTAuth\Contracts\JWTSubject;



class Account extends Model
{
  /**
* The table associated with the model.
*
* @var string
*/
   protected $table = 'account';
   protected $primaryKey = 'UserID';
   public $timestamps = false;
    protected $guarded = [];
  public function notes(){
      return $this->hasMany('App\Note','writer');
  }
  public function notesWithClients(){
      return $this->belongsToMany('App\Client','contact', 'writer', 'UserID');
  }


}
