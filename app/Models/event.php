<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [
        'title', 'description', 'date_time', 'venue', 'capacity'
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'registrations')
            ->withTimestamps();
    }
}
