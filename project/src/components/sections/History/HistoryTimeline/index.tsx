import React from 'react';
import { TimelineEvent } from './TimelineEvent';
import { events } from './data';
import { SectionContainer } from '../../../ui/SectionContainer';

export function HistoryTimeline() {
  return (
    <SectionContainer>
      <h2 className="text-4xl font-medieval text-amber-500 mb-16 text-center">
        Key Historical Events
      </h2>
      <div className="w-full space-y-12">
        {events.map((event) => (
          <TimelineEvent key={event.id} {...event} />
        ))}
      </div>
    </SectionContainer>
  );
}