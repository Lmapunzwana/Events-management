@extends('layouts.admin')

@section('content')
<div class="container">
    <h2>Manage Events</h2>
    <a href="{{ route('events.create') }}" class="btn btn-success mb-3">Create New Event</a>

    <table class="table table-striped">
        <thead>
            <tr>
                <th>Title</th>
                <th>Date/Time</th>
                <th>Venue</th>
                <th>Capacity</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach($events as $event)
            <tr>
                <td>{{ $event->title }}</td>
                <td>{{ $event->date_time->format('M d, Y H:i') }}</td>
                <td>{{ $event->venue }}</td>
                <td>{{ $event->capacity }}</td>
                <td>
                    <a href="{{ route('events.edit', $event) }}" class="btn btn-sm btn-warning">Edit</a>
                    <form action="{{ route('events.destroy', $event) }}" method="POST" class="d-inline">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-sm btn-danger" 
                            onclick="return confirm('Are you sure?')">Delete</button>
                    </form>
                    <a href="{{ route('admin.events.participants', $event) }}" 
                       class="btn btn-sm btn-info">View Participants</a>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>

    {{ $events->links() }}
</div>
@endsection
