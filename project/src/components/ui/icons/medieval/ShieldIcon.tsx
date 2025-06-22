import React from 'react';
import type { IconProps } from './types';

export function ShieldIcon({ className = '' }: IconProps) {
  return (
    <div className={`relative group ${className}`}>
      <svg
        viewBox="0 0 24 24"
        className="transform transition-all duration-700 group-hover:scale-110"
      >
        <path
          d="M12 22c5.5-2 8-6.5 8-12V6l-8-4-8 4v4c0 5.5 2.5 10 8 12z"
          className="fill-none stroke-current"
          strokeWidth="1.5"
        />
      </svg>
      <div className="absolute inset-0 bg-amber-500/0 rounded-full filter blur-lg
        transition-all duration-700 group-hover:bg-amber-500/30" />
    </div>
  );
}