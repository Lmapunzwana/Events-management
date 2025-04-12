<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Registration extends Model
{
   public function User(){
        return $this->belongsTo(User::class);
   } 

    public function Event(){
          return $this->belongsTo(Event::class);
    }
}
