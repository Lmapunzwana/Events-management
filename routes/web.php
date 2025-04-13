<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\EventController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminEventController;

//Routing fro getting all events, specific event and users who registered for an event
Route::get('/admin/events',[AdminController::class, 'getevents']);
Route::get('/admin/events/{id}',[AdminController::class,'getevent']);
Route::get('/admin/events/participants',[AdminController::class, 'getregisteredusers']);


Route::prefix('admin/events')->group(function () {
    Route::get('/', [AdminEventController::class, 'index']);               // List all events route 
    Route::post('/', [AdminEventController::class, 'store']);              // Create new event route 
    Route::put('/{event}', [AdminEventController::class, 'update']);       // Update event route 
    Route::delete('/{event}', [AdminEventController::class, 'destroy']);   // Delete event route 
    Route::get('/{event}/participants', [AdminEventController::class, 'participants']); // Get event participants
});


Route::get('/', function () {
    return Inertia::render('home');
})->name('home');

// Route::get('/home', function () {
//     return Inertia::render('home');
// })->name('home-ls');

Route::get('/event/create', function () {
    return Inertia::render('EventForm');
})->name('event-create');

Route::get('/events/{id}', function () {
    return Inertia::render('EventDetails');
})->name('event-details');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';


// Admin Event Management
Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {
    Route::resource('events', AdminEventController::class)->except(['show']);
    Route::get('events/{event}/participants', [AdminEventController::class, 'participants'])
        ->name('admin.events.participants');
});