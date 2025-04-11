<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/home', function () {
    return Inertia::render('home');
})->name('home-ls');

Route::get('/event/create', function () {
    return Inertia::render('EventForm');
})->name('event-create');

Route::get('/event/detail', function () {
    return Inertia::render('EventDetails');
})->name('event-details');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
