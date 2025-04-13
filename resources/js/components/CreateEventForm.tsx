import React, { useState } from 'react';
import axios from 'axios';

interface EventFormData {
  title: string;
  description: string;
  date_time: string;
  venue: string;
  capacity: string;
}

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

interface CreateEventFormProps {
  onSuccess?: (event: Event) => void;
}

const CreateEventForm: React.FC<CreateEventFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    description: '',
    date_time: '',
    venue: '',
    capacity: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<{ message: string; event: Event }>('/api/events', {
        ...formData,
        capacity: parseInt(formData.capacity)
      });

      if (onSuccess) {
        onSuccess(response.data.event);
      }
      
      setFormData({
        title: '',
        description: '',
        date_time: '',
        venue: '',
        capacity: ''
      });
      
      alert('Event created successfully!');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || 'Error creating event');
      } else {
        alert('An unexpected error occurred');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      {/* Form inputs remain the same as JSX version */}
      {/* ... */}

      <button
        type="submit"
        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Create Event
      </button>
    </form>
  );
};

export default CreateEventForm;