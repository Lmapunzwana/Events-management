<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Inertia\Inertia;

use Illuminate\Http\Request;

class EventController extends Controller
use Carbon\Carbon;

{
    public function index(){
        $events = Event::all();
        // For now, let's just simulate "registered events" with a filter or subset.
        $registeredEvents = $events->where('is_registered', true);
    
        return Inertia::render('home', [
            'events' => $events,
            'registeredEvents' => $registeredEvents
        ]);

        // now , showing the upcoming events in our project
        //we will be using Carbon (already included with Laravel) to get the current date and only shows events that are today or in the future, sorted by date.

            $today = Carbon::today();
            $events = Event::whereDate('date', '>=', $today)->orderBy('date')->get();
            return view('events.index', compact('events'));
        
    }

    public function api() {
        return Event::all();
    }
    
}
