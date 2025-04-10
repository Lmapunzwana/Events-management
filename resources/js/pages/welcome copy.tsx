import React from 'react';
import { PlusIcon } from 'lucide-react';
import { EventCard } from '../components/EventCard';
import { Head, Link, usePage } from '@inertiajs/react';

export function Dashboard() {
  const upcomingEvents = [{
    title: 'Tech Conference 2024',
    date: new Date('2024-03-15T09:00:00'),
    location: 'San Francisco, CA',
    description: 'Annual technology conference featuring industry leaders.',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3'
  }, {
    title: 'Music Festival',
    date: new Date('2024-04-20T15:00:00'),
    location: 'Austin, TX',
    description: 'Three-day music festival with top artists.',
    imageUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3'
  }];
  const registeredEvents = [{
    title: 'Design Workshop',
    date: new Date('2024-03-01T13:00:00'),
    location: 'Online',
    description: 'Interactive workshop on UI/UX design principles.',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3',
    isRegistered: true
  }];
  return <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Your Dashboard</h1>
        <Link href="/event" className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          <PlusIcon className="h-5 w-5 mr-2" />
          Create Event
        </Link>
      </div>
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Registered Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {registeredEvents.map(event => <EventCard key={event.title} {...event} />)}
        </div>
      </section>
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Upcoming Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map(event => <EventCard key={event.title} {...event} />)}
        </div>
      </section>
    </main>;
}