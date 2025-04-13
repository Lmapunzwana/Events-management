import React from 'react';
import axios from 'axios';

interface DeleteEventButtonProps {
  eventId: number;
  onDelete: (deletedEventId: number) => void;
}

const DeleteEventButton: React.FC<DeleteEventButtonProps> = ({ eventId, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/events/${eventId}`);
      onDelete(eventId);
      alert('Event deleted successfully!');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || 'Error deleting event');
      } else {
        alert('An unexpected error occurred');
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
    >
      Delete Event
    </button>
  );
};

export default DeleteEventButton;