import React from 'react';
import { Globe, MapPin, Clock } from 'lucide-react';
import { ParchmentBox } from '../../../ui/ParchmentBox';
import type { ReenactmentGroup } from './types';

export function GroupCard({ name, description, website, location, period }: ReenactmentGroup) {
  return (
    <ParchmentBox>
      <h3 className="text-2xl font-medieval text-amber-500 mb-4">{name}</h3>
      <p className="text-gray-400 mb-6">{description}</p>
      
      <div className="space-y-3">
        <p className="flex items-center text-gray-400">
          <MapPin className="w-5 h-5 text-amber-500 mr-2" />
          {location}
        </p>
        <p className="flex items-center text-gray-400">
          <Clock className="w-5 h-5 text-amber-500 mr-2" />
          {period}
        </p>
        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-amber-500 hover:text-amber-400 transition-colors"
        >
          <Globe className="w-5 h-5 mr-2" />
          Visit Website
        </a>
      </div>
    </ParchmentBox>
  );
}