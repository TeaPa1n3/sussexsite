import React from 'react';
import { Sword, Crown, MapPin, Flag } from 'lucide-react';
import type { BattleStats } from './types';

interface BattleDetailsProps {
  stats: BattleStats;
}

export function BattleDetails({ stats }: BattleDetailsProps) {
  return (
    <div className="space-y-6 text-gray-400">
      {/* Combatants Section */}
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-amber-500" />
            <h4 className="text-lg font-medieval text-amber-500">First Force</h4>
          </div>
          <div className="pl-7">
            <p className="text-lg">{stats.combatants.side1}</p>
            {stats.forces && (
              <p className="mt-2 text-gray-500">Army Size: {stats.forces.side1}</p>
            )}
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-amber-500" />
            <h4 className="text-lg font-medieval text-amber-500">Second Force</h4>
          </div>
          <div className="pl-7">
            <p className="text-lg">{stats.combatants.side2}</p>
            {stats.forces && (
              <p className="mt-2 text-gray-500">Army Size: {stats.forces.side2}</p>
            )}
          </div>
        </div>
      </div>

      {/* Battle Details Section */}
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-amber-500" />
            <h4 className="text-lg font-medieval text-amber-500">Location</h4>
          </div>
          <p className="pl-7">{stats.location}</p>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Flag className="w-5 h-5 text-amber-500" />
            <h4 className="text-lg font-medieval text-amber-500">Victor</h4>
          </div>
          <p className="pl-7">{stats.victor}</p>
        </div>
      </div>

      {/* Outcome Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Sword className="w-5 h-5 text-amber-500" />
          <h4 className="text-lg font-medieval text-amber-500">Outcome</h4>
        </div>
        <ul className="pl-7 space-y-2">
          {stats.outcome.map((result, index) => (
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