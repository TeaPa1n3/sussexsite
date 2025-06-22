import React from 'react';
import { Globe, Camera, Video } from 'lucide-react';
import { ParchmentBox } from '../../../ui/ParchmentBox';
import type { OtherFriend } from './types';

export function FriendCard({ name, description, website, category }: OtherFriend) {
  const Icon = category === 'Photography' ? Camera : Video;

  return (
    <ParchmentBox>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Icon className="w-8 h-8 text-amber-500" />
          <h3 className="text-2xl font-medieval text-amber-500">{name}</h3>
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