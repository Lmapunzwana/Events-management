import React, { useState } from 'react';
import axios from 'axios';
import { usePage, Head, Link } from '@inertiajs/react';
import { CalendarIcon, ClockIcon, MapPinIcon } from 'lucide-react';
import { type SharedData } from '@/types';

interface Event {
  id: number;
  title: string;
  description: string;
  date_time: string;
  venue: string;
  capacity: number;
  created_at: string;
  updated_at: string;
}

export default function EventForm() {
  const { auth } = usePage<SharedData>().props;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    venue: '',
    capacity: '',
    image: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { image, venue, ...rest } = formData;
  
    try {
      const response = await axios.post('/admin/events', {
        ...rest,
        time: formData.time,
        location: venue,
        image_path: image,
        capacity: parseInt(formData.capacity),
      });
  
      alert('Event created successfully!');
      // Clear the form
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        venue: '',
        capacity: '',
        image: '',
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || 'Error creating event');
      } else {
        alert('An unexpected error occurred');
      }
    }
  };
  

  return (
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

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Create Event</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Event Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              placeholder="Enter event title"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <div className="mt-1 relative">
                <input
                  type="date"
                  id="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2"
                />
                <CalendarIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                Time
              </label>
              <div className="mt-1 relative">
                <input
                  type="time"
                  id="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2"
                />
                <ClockIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="venue" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <div className="mt-1 relative">
              <input
                type="text"
                id="venue"
                value={formData.venue}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="Enter event location"
              />
              <MapPinIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              placeholder="Enter event description"
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Event Image URL
            </label>
            <input
              type="url"
              id="image"
              value={formData.image}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              placeholder="Enter image URL"
            />
          </div>

          <div>
            <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
              Capacity
            </label>
            <input
              type="number"
              id="capacity"
              value={formData.capacity}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              placeholder="Enter max capacity"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Create Event
            </button>
          </div>
        </form>
      </main>

      <div className="hidden h-14.5 lg:block"></div>
    </div>
  );
}
