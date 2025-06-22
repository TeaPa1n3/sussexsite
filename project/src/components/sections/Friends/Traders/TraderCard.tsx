import React from 'react';
import { Globe, Tag } from 'lucide-react';
import { ParchmentBox } from '../../../ui/ParchmentBox';
import type { Trader } from './types';

export function TraderCard({ name, description, website, specialties }: Trader) {
  return (
    <ParchmentBox>
      <h3 className="text-2xl font-medieval text-amber-500 mb-4">{name}</h3>
      <p className="text-gray-400 mb-6">{description}</p>
      
      <div className="space-y-4">
        <div>
          <div className="flex items-center mb-2">
            <Tag className="w-5 h-5 text-amber-500 mr-2" />
            <span className="text-amber-500">Specialties</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {specialties.map((specialty) => (
              <span
                key={specialty}
                className="px-3 py-1 bg-amber-500/10 text-amber-500 rounded-full text-sm"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>
        
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