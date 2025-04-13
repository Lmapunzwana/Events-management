@extends('layouts.admin')

@section('content')
<div class="container">
    <h2>Participants for: {{ $event->title }}</h2>
    
    <table class="table table-striped">
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Registration Date</th>
            </tr>
        </thead>
        <tbody>
            @forelse($participants as $user)
            <tr>
                <td>{{ $user->name }}</td>
                <td>{{ $user->email }}</td>
                <td>{{ $user->pivot->created_at->format('M d, Y H:i') }}</td>
            </tr>
            @empty
            <tr>
                <td colspan="3" class="text-center">No participants yet</td>
            </tr>
            @endforelse
        </tbody>
    </table>

    {{ $participants->links() }}
</div>
@endsection