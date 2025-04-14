<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;

class AdminController extends Controller
{
    public function getevents()
    {
        $events = event::all();
        return response()->json($events);
    }

    public function getevent($id)
    {
        $event = event::find($id);
        return response()->json($event);
    }

    public function getRegisteredEvents(Request $request)
    {
        // Get the user ID from authenticated user
        $userId = $request->user()->id;

        // Get the list of event IDs the user is registered for
        $eventIds = Registration::where('user_id', $userId)
            ->pluck('events_id'); // Retrieve only the event IDs

        // Get the details of those events
        $events = Event::whereIn('id', $eventIds)->get();

        return response()->json($events);
    }
}
