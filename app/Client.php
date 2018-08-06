<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    //
    protected $table = 'user';
    protected $primaryKey = 'UserID';
    protected $dateFormat = 'Y-m-d';
    public $timestamps = false;
    protected $guarded = [];
    protected $dates = ['Vexpiry', 'Pexpiry', 'duedate'];
    public function consultant(){

      return $this->belongsTo('App\Account','ConsultantID', 'UserID');

    }
    //one to many
    public function notes(){

      return $this->hasMany('App\Note','UserID');

    }
    //many to many relationship
    public function notesWithAuthors(){
      return $this->belongsToMany('App\Account', 'contact', 'UserID', 'writer');
    }




}
