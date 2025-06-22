import React, { useState } from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { ParchmentBox } from '../../ui/ParchmentBox';
import { memberEvents } from '../Members/EventsCalendar/data';

export function PublicEventsCalendar() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'archive'>('upcoming');

  // Sort events into upcoming and archive based on date
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to start of day for accurate comparison

  const sortedEvents = memberEvents.reduce(
    (acc, event) => {
      // Handle different date formats
      const eventDate = (() => {
        // For date ranges (e.g., "August 1-3, 2025"), use the first date
        if (event.date.includes('-')) {
          const [startDate] = event.date.split('-');
          return new Date(startDate.trim() + ', ' + event.date.split(',')[1]);
        }
        // If date contains a comma, it's a specific date (e.g., "February 22, 2025")
        if (event.date.includes(',')) {
          return new Date(event.date);
        }
        // For month-only dates (e.g., "May 2025"), set to the last day of the month
        const [month, year] = event.date.split(' ');
        if (month && year) {
          const monthIndex = new Date(`${month} 1`).getMonth();
          // Set to last day of the month to ensure event isn't prematurely archived
          return new Date(parseInt(year), monthIndex + 1, 0);
        }
        // If date format is not recognized, consider it as an upcoming event
        return new Date(today.getFullYear() + 1, 0, 1); // Future date
      })();

      // Only put events in archive if their date has definitely passed
      if (!isNaN(eventDate.getTime()) && eventDate < today) {
        acc.archive.push(event);
      } else {
        acc.upcoming.push(event);
      }
      return acc;
    },
    { upcoming: [], archive: [] }
  );

  // Sort upcoming events by date
  sortedEvents.upcoming.sort((a, b) => {
    const getDateValue = (dateStr: string) => {
      // For date ranges, use the first date
      if (dateStr.includes('-')) {
        const [startDate] = dateStr.split('-');
        return new Date(startDate.trim() + ', ' + dateStr.split(',')[1]).getTime();
      }
      // For month-only dates, use the first of the month
      if (!dateStr.includes(',')) {
        const [month, year] = dateStr.split(' ');
        const monthIndex = new Date(`${month} 1`).getMonth();
        return new Date(parseInt(year), monthIndex, 1).getTime();
      }
      return new Date(dateStr).getTime();
    };

    const timeA = getDateValue(a.date);
    const timeB = getDateValue(b.date);
    return isNaN(timeA) || isNaN(timeB) ? 0 : timeA - timeB;
  });

  // Sort archive events by date in reverse chronological order
  sortedEvents.archive.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return isNaN(dateA.getTime()) || isNaN(dateB.getTime()) 
      ? 0 
      : dateB.getTime() - dateA.getTime();
  });

  // Filter out private events
  const displayEvents = (activeTab === 'upcoming' ? sortedEvents.upcoming : sortedEvents.archive)
    .filter(event => event.type !== 'Private Event');

  return (
    <section className="py-12">
      <h2 className="text-3xl font-medieval text-amber-500 mb-8 text-center">
        Upcoming Events
      </h2>

      {/* Tabs */}
      <div className="flex gap-3 md:gap-4 mb-6 justify-center">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-3 md:px-4 py-2 rounded-full transition-colors text-sm md:text-base ${
            activeTab === 'upcoming'
              ? 'bg-amber-500/20 text-amber-500'
              : 'text-gray-400 hover:text-amber-500 hover:bg-amber-500/10'
          }`}
        >
          Upcoming Events
        </button>
        <button
          onClick={() => setActiveTab('archive')}
          className={`px-3 md:px-4 py-2 rounded-full transition-colors text-sm md:text-base ${
            activeTab === 'archive'
              ? 'bg-amber-500/20 text-amber-500'
              : 'text-gray-400 hover:text-amber-500 hover:bg-amber-500/10'
          }`}
        >
          Past Events
        </button>
      </div>

      <div className="space-y-4">
        {displayEvents.length === 0 ? (
          <ParchmentBox>
            <div className="p-4 md:p-6 text-center text-gray-400">
              No {activeTab === 'upcoming' ? 'upcoming' : 'past'} events to display.
            </div>
          </ParchmentBox>
        ) : (
          displayEvents.map((event) => (
            <ParchmentBox key={event.title}>
              <div className="p-4">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-shrink-0 w-full md:w-36 p-2 bg-amber-500/10 rounded-lg text-center">
                    <Calendar className="w-5 h-5 md:w-6 md:h-6 text-amber-500 mx-auto mb-1" />
                    <p className="text-amber-500 font-medium text-xs md:text-sm">{event.date}</p>
                  </div>
                  <div className="flex-grow min-w-0">
                    <h3 className="text-base md:text-lg font-medieval text-amber-500 mb-1">{event.title}</h3>
                    <p className="text-gray-400 text-sm mb-2">{event.description}</p>
                    <div className="flex items-center text-gray-400 text-xs md:text-sm">
                      <MapPin className="w-4 h-4 text-amber-500 mr-2 flex-shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>
                  <div className="hidden md:block flex-shrink-0">
                    <span className="px-3 py-1 bg-amber-500/10 text-amber-500 rounded-full text-sm">
                      {event.type}
                    </span>
                  </div>
                </div>
              </div>
            </ParchmentBox>
          ))
        )}
      </div>
    </section>
  );
}