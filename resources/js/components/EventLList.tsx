import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteEventButton from './DeleteEventButton';
import CreateEventForm from './CreateEventForm';

interface Event {
  id: number;
  title: string;
  description: string;
  date_time: string;
  venue: string;
  capacity: number;
}

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get<{ data: Event[] }>('/api/events');
      setEvents(response.data.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleNewEvent = (newEvent: Event) => {
    setEvents([...events, newEvent]);
  };

  const handleDelete = (deletedEventId: number) => {
    setEvents(events.filter(event => event.id !== deletedEventId));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Events</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Create New Event</h2>
        <CreateEventForm onSuccess={handleNewEvent} />
      </div>

      <div className="space-y-4">
        {events.map(event => (
          <div key={event.id} className="p-4 border rounded shadow-sm">
            <h3 className="text-lg font-medium">{event.title}</h3>
            <p className="text-gray-600">{event.description}</p>
            <div className="mt-2 flex items-center gap-4">
              <DeleteEventButton eventId={event.id} onDelete={handleDelete} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;