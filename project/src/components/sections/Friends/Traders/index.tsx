import React from 'react';
import { TraderCard } from './TraderCard';
import { traders } from './data';

export function Traders() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {traders.map((trader) => (
        <TraderCard key={trader.name} {...trader} />
      ))}
    </div>
  );
}