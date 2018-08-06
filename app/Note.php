<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    protected $table = "contact";
    protected $primaryKey = 'ID';
    public $timestamps = false;
    /**
     * Get the author record associated with the note.
     */

     /**
      * The attributes that are mass assignable.
      *
      * @var array
      */
     protected $fillable = [
         'Content','writer','UserID'
     ];
    public function authors()
    {
        return $this->belongsTo('App\Account','writer','UserID');
    }

}
