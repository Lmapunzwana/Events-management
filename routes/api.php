<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminEventController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('admin/events')->group(function () {
    Route::get('/', [AdminEventController::class, 'index']);               // List all events route 
    Route::post('/', [AdminEventController::class, 'store']);              // Create new event route 
    Route::put('/{event}', [AdminEventController::class, 'update']);       // Update event route 
    Route::delete('/{event}', [AdminEventController::class, 'destroy']);   // Delete event route 
    Route::get('/{event}/participants', [AdminEventController::class, 'participants']); // Get event participants
});
