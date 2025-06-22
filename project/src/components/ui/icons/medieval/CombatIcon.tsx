import React from 'react';
import type { IconProps } from './types';

export function CombatIcon({ className = '' }: IconProps) {
  return (
    <div className={`relative group ${className}`}>
      <svg
        viewBox="0 0 24 24"
        className="transform transition-all duration-700 group-hover:scale-110"
      >
        {/* Shield base with pulsing effect */}
        <path
          d="M12 22c5.5-2 8-6.5 8-12V6l-8-4-8 4v4c0 5.5 2.5 10 8 12z"
          className="fill-none stroke-current animate-pulse"
          strokeWidth="1.5"
        />
        
        {/* Crossed swords with clash animation */}
        <g className="origin-center group-hover:animate-clash">
          <path
            d="M14.5 17.5L19 13l-4.5-4.5M9.5 17.5L5 13l4.5-4.5"
            className="fill-none stroke-current"
            strokeWidth="1.5"
          />
        </g>
        
        {/* Decorative shield pattern */}
        <circle
          cx="12"
          cy="12"
          r="3"
          className="fill-none stroke-current opacity-50 group-hover:opacity-100 transition-opacity duration-500"
          strokeDasharray="15"
          strokeDashoffset="15"
          style={{ animation: 'dash 2s ease-out forwards infinite' }}
        />
      </svg>
      
      {/* Enhanced glow effect */}
      <div className="absolute inset-0 bg-amber-500/0 rounded-full filter blur-lg
        transition-all duration-700 group-hover:bg-amber-500/30" />
    </div>
  );
}