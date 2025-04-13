import { useEffect, useState } from 'react';
import axios from 'axios';
import { Head, Link } from '@inertiajs/react';
import { Search, CalendarDays, Users, Layout, TrashIcon, EditIcon, LockIcon } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

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

        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

  <div className="bg-gray-800 rounded-lg overflow-hidden">
  <div className="overflow-x-auto">
    <table className="min-w-full">
      <thead>
        <tr className="text-xs text-gray-400 border-b border-gray-700">
          <th className="py-3 px-4 text-left">Title</th>
          <th className="py-3 px-4 text-left">Location</th>
          <th className="py-3 px-4 text-left">Date</th>
          <th className="py-3 px-4 text-left">Description</th>
          <th className="py-3 px-4 text-left">Registered</th>
          <th className="py-3 px-4 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {events.map(event => (
          <tr key={event.id} className="border-b border-gray-700">
            <td className="py-3 px-4">{event.title}</td>
            <td className="py-3 px-4">{event.location}</td>
            <td className="py-3 px-4">
              {event.date.toLocaleDateString()} {event.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </td>
            <td className="py-3 px-4 truncate max-w-xs">{event.description}</td>
            <td className="py-3 px-4">
              {event.isRegistered ? (
                <span className="text-green-500 font-medium">Yes</span>
              ) : (
                <span className="text-gray-400">No</span>
              )}
            </td>
            <td className="py-3 px-4">
              <div className="flex space-x-2">
                <button className="p-1 hover:text-blue-400">
                  <EditIcon size={16} />
                </button>
                <button className="p-1 hover:text-yellow-400">
                  <LockIcon size={16} />
                </button>
                <button className="p-1 hover:text-red-400">
                  <TrashIcon size={16} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

      </div>
    </AppLayout>
  );
}
