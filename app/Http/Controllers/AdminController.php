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

    public function getregisteredusers($id)
    {
        $event = event::with('participants')->find($id);
        return response()->json($event->participants);
    }
}
