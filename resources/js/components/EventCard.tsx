import React from 'react';
import { Calendar, Clock, MapPin, CheckCircleIcon } from 'lucide-react';
interface EventCardProps {
  title: string;
  date: Date;
  location: string;
  description: string;
  imageUrl: string;
  isRegistered?: boolean;
}
export function EventCard({
  title,
  date,
  location,
  description,
  imageUrl,
  isRegistered
}: EventCardProps) {
  return <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <div className="mt-2 space-y-2">
          <div className="flex items-center text-gray-600">
            <Calendar className="h-5 w-5 mr-2" />
            <span>{/*format(date, 'MMMM d, yyyy')*/}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="h-5 w-5 mr-2" />
            <span>ddd</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="h-5 w-5 mr-2" />
            <span>{location}</span>
          </div>
        </div>
        <p className="mt-4 text-gray-600">{description}</p>
        {isRegistered && <div className="mt-4 flex items-center text-green-600">
            <CheckCircleIcon className="h-5 w-5 mr-2" />
            <span>Registered</span>
          </div>}
      </div>
    </div>;
}