@extends('layouts.admin')

@section('content')
<div class="container">
    <h2>{{ isset($event) ? 'Edit' : 'Create' }} Event</h2>
    
    <form method="POST" action="{{ isset($event) ? route('events.update', $event) : route('admin.events.store') }}">
        @csrf
        @isset($event) @method('PUT') @endisset

        <div class="mb-3">
            <label for="title" class="form-label">Event Title</label>
            <input type="text" class="form-control" id="title" name="title" 
                   value="{{ old('title', $event->title ?? '') }}" required>
        </div>

        <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <textarea class="form-control" id="description" name="description" rows="3" required>
                {{ old('description', $event->description ?? '') }}
            </textarea>
        </div>

        <div class="mb-3">
            <label for="date_time" class="form-label">Date & Time</label>
            <input type="datetime-local" class="form-control" id="date_time" name="date_time"
                   value="{{ old('date_time', isset($event) ? $event->date_time->format('Y-m-d\TH:i') : '') }}" required>
        </div>

        <div class="mb-3">
            <label for="venue" class="form-label">Venue</label>
            <input type="text" class="form-control" id="venue" name="venue"
                   value="{{ old('venue', $event->venue ?? '') }}" required>
        </div>

        <div class="mb-3">
            <label for="capacity" class="form-label">Capacity</label>
            <input type="number" class="form-control" id="capacity" name="capacity"
                   value="{{ old('capacity', $event->capacity ?? '') }}" min="1" required>
        </div>

        <button type="submit" class="btn btn-primary">
            {{ isset($event) ? 'Update' : 'Create' }} Event
        </button>
    </form>
</div>
@endsection