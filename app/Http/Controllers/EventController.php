<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Inertia\Inertia;

use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index(){
        $events = Event::all();
        // For now, let's just simulate "registered events" with a filter or subset.
        $registeredEvents = $events->where('is_registered', true);
    
        return Inertia::render('home', [
            'events' => $events,
            'registeredEvents' => $registeredEvents
        ]);
    }

    public function api() {
        return Event::all();
    }
    
}
