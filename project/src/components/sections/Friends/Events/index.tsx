import React from 'react';
import { EventCard } from './EventCard';
import { events } from './data';
import { SectionContainer } from '../../../ui/SectionContainer';

export function Events() {
  return (
    <SectionContainer>
      <h2 className="text-4xl font-medieval text-amber-500 mb-12 text-center">
        Notable Events
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <EventCard key={event.name} {...event} />
        ))}
      </div>
    </SectionContainer>
  );
}