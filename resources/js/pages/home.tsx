import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { CalendarIcon, UsersIcon, BellIcon, CheckCircleIcon } from 'lucide-react';
import { PlusIcon } from 'lucide-react';
import { EventCard } from '../components/EventCard';


export default function Home() {
    const { auth } = usePage<SharedData>().props;
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
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Your Dashboard</h1>
        <Link href="/event/create" className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
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
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}