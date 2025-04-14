import { useEffect, useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import { Search } from 'lucide-react';
import { type SharedData } from '@/types';
import { EventCard } from '../components/EventCard';

interface EventCardProps {
  id: number;
  title: string;
  date: Date;
  location: string;
  description: string;
  image_path: string;
  isRegistered?: boolean;
}

export default function Home() {
  const { auth } = usePage<SharedData>().props;

  const [searchQuery, setSearchQuery] = useState('');
  const [upcomingEvents, setUpcomingEvents] = useState<EventCardProps[]>([]);
  const [registeredEvents, setRegisteredEvents] = useState<EventCardProps[]>([]);

  useEffect(() => {
    // Fetch upcoming events
    axios.get('/admin/events')
      .then(res => {
        const events = res.data.data.map((event: any) => ({
          ...event,
          date: new Date(event.date + 'T' + (event.time ?? '00:00')),
        }));
        setUpcomingEvents(events);
      })
      .catch((error) => console.error("Error fetching upcoming events:", error));

    // Fetch registered events
    axios.get('/admin/events/registered') // Assuming you have a dedicated endpoint for registered events
      .then(res => {
        const events = Array.isArray(res.data.data) 
          ? res.data.data.map((event: any) => ({
              ...event,
              isRegistered: true,
              date: new Date(event.date + 'T' + (event.time ?? '00:00')),
            }))
          : [{
              ...res.data.data,
              isRegistered: true,
              date: new Date(res.data.data.date + 'T' + (res.data.data.time ?? '00:00')),
            }];
          
        setRegisteredEvents(events);
      })
      .catch((error) => console.error("Error fetching registered events:", error));

  }, []);

  const filterEvents = (events: EventCardProps[]) =>
    events.filter(event =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <>
      <Head title="Home" />
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

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Home</h1>
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Registered Events */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Registered Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filterEvents(registeredEvents).map(event => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>
          </section>

          {/* Upcoming Events */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Upcoming Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterEvents(upcomingEvents).map(event => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>
          </section>
        </main>

        <div className="hidden h-14.5 lg:block"></div>
      </div>
    </>
  );
}
