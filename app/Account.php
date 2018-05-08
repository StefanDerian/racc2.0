<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Tymon\JWTAuth\Contracts\JWTSubject;



class Account extends Model implements JWTSubject
{
  /**
* The table associated with the model.
*
* @var string
*/
protected $table = 'account';
protected $primaryKey = 'UserId';

/**
    * Get the identifier that will be stored in the subject claim of the JWT.
    *
    * @return mixed
    */
   public function getJWTIdentifier()
   {
       return $this->getKey();
   }
   /**
    * Return a key value array, containing any custom claims to be added to the JWT.
    *
    * @return array
    */
   public function getJWTCustomClaims()
   {
       return [];
   }


}
