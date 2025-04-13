import { useEffect, useState } from 'react';
import axios from 'axios';
import { Head, Link } from '@inertiajs/react';
import { Search, CalendarDays, Users, Layout, PlusIcon } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
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

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
];

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState<EventCardProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;

  const stats = [
    { title: 'Total Events', value: events.length.toString(), icon: CalendarDays },
    { title: 'Registered Users', value: '248', icon: Users },
    { title: 'Active Events', value: events.filter(e => e.isRegistered).length.toString(), icon: Layout },
  ];


  useEffect(() => {
    axios.get('/admin/events')
  .then(response => {
    const parsedEvents = response.data.data.map((event: any) => ({
      ...event,
      date: new Date(event.date + 'T' + (event.time ?? '00:00')),
    }));
    setEvents(parsedEvents);
  })
  .catch(error => {
    console.error('Error fetching events:', error);
  });

  }, []);

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const startIndex = (currentPage - 1) * eventsPerPage;
  const paginatedEvents = filteredEvents.slice(startIndex, startIndex + eventsPerPage);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex flex-col gap-6 p-6">
        {/* Stats Section */}
        <div className="grid gap-6 md:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.title} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</p>
                    <h3 className="text-2xl font-semibold mt-1">{stat.value}</h3>
                  </div>
                  <Icon className="h-8 w-8 text-blue-500" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
            />
          </div>
          <Link href="/event/create" className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          <PlusIcon className="h-5 w-5 mr-2" />
          Create Event
        </Link>
        </div>

        {/* Event Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-4">
          {paginatedEvents.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>

        {/* Pagination (basic) */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6">
            <div className="inline-flex rounded-md shadow-sm border overflow-hidden">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 text-sm ${
                    currentPage === i + 1
                      ? 'bg-blue-500 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  } hover:bg-blue-100 dark:hover:bg-gray-700`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
