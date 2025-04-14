<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;


class RegistrationController extends Controller
{
    public function store(Request $request,Event $event)
{
    if ($event->capacity <= $event->registrations()->count()) {
        return back()->with('error', 'Event is full');

    }

    auth()->user()->registrations()->create([
        'event_id' => $event->id,
    ]);
    
    
    return back()->with('success', 'Registered successfully');
    }

}