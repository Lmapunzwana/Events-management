<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class event extends Model
{
    public function Registration()
    {
        return $this->hasMany(Registration::class);
    }
   
    
}
