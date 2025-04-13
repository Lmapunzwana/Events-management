<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\User;

class AdminEventController extends Controller
{
    public function index()
    {
        $events = Event::latest()->paginate(10);
        return response()->json($events);
    }

    public function store(Request $request)
{
    $validated = $request->validate([
        'title' => 'required|max:255',
        'description' => 'required',
        'date' => 'required|date|after:now',
        'time' => 'required|date_format:H:i',
        'location' => 'required',
        'capacity' => 'required|integer|min:1',
        'image_path' => 'nullable|url'
    ]);

    $event = Event::create($validated);

    return response()->json([
        'message' => 'Event created successfully!',
        'event' => $event
    ], 201);
}
    public function update(Request $request, Event $event)
    {
        $validated = $request->validate([
            'title' => 'required|max:255',
            'description' => 'required',
            'date_time' => 'required|date',
            'venue' => 'required',
            'capacity' => 'required|integer|min:1'
        ]);

        $event->update($validated);

        return response()->json([
            'message' => 'Event updated successfully!',
            'event' => $event
        ]);
    }

    public function destroy(Event $event)
    {
        $event->delete();
        return response()->json(['message' => 'Event deleted successfully!']);
    }

    public function participants(Event $event)
    {
        $participants = $event->users()->paginate(10);
        return response()->json($participants);
    }
}