<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory; 
    protected $fillable = [
        'name',
        'date',
        'location'
    ];

    //Reltaionship to other models
    public function registrations()
    {
        return $this->hasMany(Registration::class);
    }

    public function participants()
    {
        return $this->belongsToMany(User::class, 'registrations');
    }
}
