<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Inertia\Inertia;
use Carbon\Carbon;

use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index(){
        $today = Carbon::today();
        $events = Event::whereDate('date','>=',$today)->orderBy('date')->get();
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
