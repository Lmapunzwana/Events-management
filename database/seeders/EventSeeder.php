<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Event;

class EventSeeder extends Seeder
{
    public function run()
    {
        Event::insert([
            [
                'title' => 'Tech Conference 2024',
                'date' => '2024-05-20 09:00:00',
                'location' => 'National Stadium, HRE',
                'description' => 'Annual tech gathering with top innovators.',
                'imageUrl' => 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3',
                'is_registered' => false,
            ],
            [
                'title' => 'Design Meetup',
                'date' => '2024-06-15 14:00:00',
                'location' => 'Online',
                'description' => 'UI/UX design workshop and networking.',
                'imageUrl' => 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3',
                'is_registered' => true,
            ],
            [
                'title' => 'Music Fest',
                'date' => '2024-07-10 18:00:00',
                'location' => 'Harare Gardens',
                'description' => 'Outdoor concert with local artists.',
                'imageUrl' => 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3',
                'is_registered' => false,
            ],
        ]);
    }
}
