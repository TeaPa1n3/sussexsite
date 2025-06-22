import React from 'react';
import { TimelineIcon } from './TimelineIcon';
import { BattleDetails } from './BattleDetails';
import { EventDetails } from './EventDetails';
import { ParchmentBox } from '../../../ui/ParchmentBox';
import type { TimelineEvent as TimelineEventType } from './types';

export function TimelineEvent({ year, title, type, description, battleStats, details }: TimelineEventType) {
  const isWideEvent = type === 'battle' || details;

  return (
    <div className="relative flex items-start gap-8 w-full">
      <div className="hidden md:block w-24 text-right flex-shrink-0">
        <span className="text-xl font-medieval text-amber-500">{year}</span>
      </div>
      
      <div className="hidden md:flex flex-col items-center flex-shrink-0">
        <TimelineIcon type={type} />
        <div className="w-0.5 h-full bg-amber-500/20" />
      </div>
      
      <div className="w-full">
        <ParchmentBox>
          <div className="p-6">
            <div className="md:hidden mb-2">
              <span className="text-xl font-medieval text-amber-500">{year}</span>
            </div>
            <h3 className="text-2xl font-medieval text-amber-500 mb-4 flex items-center gap-3">
              <span className="md:hidden"><TimelineIcon type={type} /></span>
              {title}
            </h3>
            
            {description && <p className="text-gray-400 mb-6 text-lg leading-relaxed">{description}</p>}
            
            {/* Two-column layout for battle stats and details */}
            <div className={isWideEvent ? 'grid md:grid-cols-2 gap-8' : ''}>
              {battleStats && <BattleDetails stats={battleStats} />}
              {details && <EventDetails details={details} />}
            </div>
          </div>
        </ParchmentBox>
      </div>
    </div>
  );
}