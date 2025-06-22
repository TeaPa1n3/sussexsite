import React from 'react';
import type { IconProps } from './types';

export function AxeIcon({ className = '' }: IconProps) {
  return (
    <div className={`relative group ${className}`}>
      <svg
        viewBox="0 0 24 24"
        className="transform transition-all duration-700 group-hover:scale-110"
      >
        <path
          d="M6 8l4-4 6 6-4 4M8 14l-2.5 2.5a2.121 2.121 0 003 3L11 17"
          className="fill-none stroke-current"
          strokeWidth="1.5"
        />
      </svg>
      <div className="absolute inset-0 bg-amber-500/0 rounded-full filter blur-lg
        transition-all duration-700 group-hover:bg-amber-500/30" />
    </div>
  );
}