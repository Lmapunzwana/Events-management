import { type SharedData } from '@/types';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, Share2, UserCircle, CheckCircle } from 'lucide-react';
import { EventCard } from '../components/EventCard';
import { usePage, Link } from '@inertiajs/react';

export default function EventDetails() {
    const { auth } = usePage<SharedData>().props;
    const {
      id
    } = useParams();
    const [isRegistered, setIsRegistered] = useState(false);
    // Mock event data - in a real app, this would come from an API
    const event = {
      id: '1',
      title: 'Tech Conference 2024',
      date: new Date('2024-03-15T09:00:00'),
      location: 'UNiversity Of Zimbabwe- Innovation Hub',
      description: 'Join us for the biggest tech conference of the year! Featuring keynote speakers from leading tech companies, workshops, networking sessions, and the latest in technology trends. This event brings together developers, designers, and tech enthusiasts from around the world.',
      imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3',
      organizer: 'Tech Events Inc.',
      capacity: 500,
      registeredAttendees: 342
    };
    // Similar events
    const similarEvents = [{
      title: 'Developer Summit',
      date: new Date('2024-04-10T10:00:00'),
      location: 'Harare City Sports Center, HRE',
      description: 'Annual developer conference with industry experts.',
      imageUrl: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?ixlib=rb-4.0.3'
    }, {
      title: 'UX Design Workshop',
      date: new Date('2024-03-25T13:00:00'),
      location: 'National Sports Stadium, HRE',
      description: 'Hands-on workshop for UX designers.',
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3'
    }];
    const handleRegister = () => {
      setIsRegistered(!isRegistered);
      // this should make an API call to register the user
    };

    return (
        <>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035]"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a]"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                
        <div className="relative h-96 w-full">
        <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white text-center max-w-4xl px-4">
            {event.title}
          </h1>
        </div>
      </div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Event Details
                  </h2>
                  <button className="p-2 text-gray-600 hover:text-gray-900" aria-label="Share event">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>
                      {event.date.toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>
                      {event.date.toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="h-5 w-5 mr-2" />
                    <span>
                      {event.registeredAttendees} / {event.capacity} registered
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Description
                  </h3>
                  <p className="text-gray-600 whitespace-pre-line">
                    {event.description}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Organizer
                  </h3>
                  <div className="flex items-center">
                    <UserCircle className="h-8 w-8 text-gray-400 mr-2" />
                    <span className="text-gray-600">{event.organizer}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <button onClick={handleRegister} className={`w-full py-3 px-4 rounded-md text-center font-medium ${isRegistered ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-blue-600 text-white hover:bg-blue-700'} transition-colors`}>
                {isRegistered ? <span className="flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Registered
                  </span> : 'Register Now'}
              </button>
              <button onClick={handleRegister} className={`w-full py-3 px-4 rounded-md text-center font-medium bg-red-600 text-white hover:bg-red-700 mt-2 transition-colors`}>
                { 'Register Now'}
              </button>
              {isRegistered && <p className="mt-4 text-sm text-gray-600 text-center">
                  You're all set! We'll send you a confirmation email with more
                  details.
                </p>}
            </div>
          </div>
        </div>
        {/* Similar Events Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Similar Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {similarEvents.map(event => <EventCard key={event.title} {...event} />)}
          </div>
        </section>
      </main>

                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}