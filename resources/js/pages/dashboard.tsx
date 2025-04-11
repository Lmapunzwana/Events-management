import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { PlusIcon, CalendarDays, Users, Layout, Search } from 'lucide-react';
import { EventCard } from '@/components/EventCard';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
];

export default function Dashboard() {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 6;

    const stats = [
        { title: 'Total Events', value: '12', icon: CalendarDays },
        { title: 'Registered Users', value: '248', icon: Users },
        { title: 'Active Events', value: '6', icon: Layout },
    ];

    const allEvents = [
        {
            title: 'Tech Summit 2025',
            date: new Date('2025-05-15'),
            location: 'San Francisco, CA',
            description: 'Join us for the biggest tech event of the year.',
            imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3',
            isRegistered: true
        },
        {
            title: 'Design Conference',
            date: new Date('2025-06-20'),
            location: 'New York, NY',
            description: 'Explore the latest trends in UI/UX design.',
            imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3',
            isRegistered: true
        },
        // Add more events here
    ];

    // Filter events based on search query
    const filteredEvents = allEvents.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Calculate pagination
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

                {/* Search and Create Event Section */}
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
                    <Link
                        href="/event/create"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
                    >
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Create Event
                    </Link>
                </div>

                {/* Events Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedEvents.map((event) => (
                        <EventCard key={event.title} {...event} />
                    ))}
                </div>

                {/* Pagination */}
                {filteredEvents.length > 0 && (
                    <div className="flex justify-center items-center gap-2 mt-6">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1 rounded-md border border-gray-200 dark:border-gray-700 disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                            Previous
                        </button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`px-3 py-1 rounded-md ${
                                    currentPage === i + 1
                                        ? 'bg-blue-600 text-white'
                                        : 'border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 rounded-md border border-gray-200 dark:border-gray-700 disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                            Next
                        </button>
                    </div>
                )}

                {/* Empty State */}
                {filteredEvents.length === 0 && (
                    <div className="text-center py-12">
                        <CalendarDays className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-lg font-semibold text-gray-900">No events found</h3>
                        <p className="mt-1 text-gray-500">
                            {searchQuery ? 'Try adjusting your search terms.' : 'Get started by creating your first event.'}
                        </p>
                        {!searchQuery && (
                            <Link
                                href="/event/create"
                                className="mt-6 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                                <PlusIcon className="h-5 w-5 mr-2" />
                                Create Event
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
