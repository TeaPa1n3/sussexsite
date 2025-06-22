import React from 'react';
import { Sword, Crown, Scroll, Book, Flag, Castle } from 'lucide-react';

interface TimelineIconProps {
  type: 'battle' | 'coronation' | 'document' | 'survey' | 'rebellion' | 'siege';
}

export function TimelineIcon({ type }: TimelineIconProps) {
  const icons = {
    battle: Sword,
    coronation: Crown,
    document: Scroll,
    survey: Book,
    rebellion: Flag,
    siege: Castle
  };

  const Icon = icons[type];

  return (
    <div className="relative group">
      <Icon className="w-8 h-8 text-amber-500 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12" />
      <div className="absolute inset-0 bg-amber-500/0 rounded-full filter blur-lg transition-all duration-500 group-hover:bg-amber-500/20" />
    </div>
  );
}