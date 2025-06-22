import React from 'react';
import { Users, AlertCircle, CheckCircle } from 'lucide-react';
import type { EventDetails as EventDetailsType } from './types';

interface EventDetailsProps {
  details: EventDetailsType;
}

export function EventDetails({ details }: EventDetailsProps) {
  return (
    <div className="space-y-6 text-gray-400">
      {/* Notable Names Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-amber-500" />
          <h4 className="text-lg font-medieval text-amber-500">Notable Names</h4>
        </div>
        <ul className="pl-7 space-y-2">
          {details.notableNames.map((name, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="mt-2 w-1.5 h-1.5 bg-amber-500 rounded-full flex-shrink-0" />
              <span>{name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Causes Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-amber-500" />
          <h4 className="text-lg font-medieval text-amber-500">Causes</h4>
        </div>
        <ul className="pl-7 space-y-2">
          {details.causes.map((cause, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="mt-2 w-1.5 h-1.5 bg-amber-500 rounded-full flex-shrink-0" />
              <span>{cause}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Results Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-amber-500" />
          <h4 className="text-lg font-medieval text-amber-500">Results</h4>
        </div>
        <ul className="pl-7 space-y-2">
          {details.results.map((result, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="mt-2 w-1.5 h-1.5 bg-amber-500 rounded-full flex-shrink-0" />
              <span>{result}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}