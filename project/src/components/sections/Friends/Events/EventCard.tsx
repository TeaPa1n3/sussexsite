import React from 'react';
import { Calendar, MapPin, Globe, Users } from 'lucide-react';
import { ParchmentBox } from '../../../ui/ParchmentBox';
import type { FriendEvent } from './types';

export function EventCard({ name, organizer, date, location, description, website }: FriendEvent) {
  return (
    <ParchmentBox>
      <div className="space-y-4">
        <h3 className="text-2xl font-medieval text-amber-500">{name}</h3>
        
        <div className="space-y-2">
          <p className="flex items-center text-gray-400">
            <Users className="w-5 h-5 text-amber-500 mr-2" />
            {organizer}
          </p>
          <p className="flex items-center text-gray-400">
            <Calendar className="w-5 h-5 text-amber-500 mr-2" />
            {date}
          </p>
          <p className="flex items-center text-gray-400">
            <MapPin className="w-5 h-5 text-amber-500 mr-2" />
            {location}
          </p>
        </div>
        
        <p className="text-gray-400">{description}</p>
        
        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-amber-500 hover:text-amber-400 transition-colors"
        >
          <Globe className="w-5 h-5 mr-2" />
          Visit Website
        </a>
      </div>
    </ParchmentBox>
  );
}