import React from 'react';
import type { IconProps } from './types';

export function SwordIcon({ className = '' }: IconProps) {
  return (
    <div className={`relative group ${className}`}>
      <svg
        viewBox="0 0 24 24"
        className="transform transition-all duration-700 group-hover:scale-110"
      >
        <path
          d="M14.5 17.5L19 13l-4.5-4.5M9.5 17.5L5 13l4.5-4.5"
          className="fill-none stroke-current group-hover:animate-clash"
          strokeWidth="1.5"
        />
      </svg>
      <div className="absolute inset-0 bg-amber-500/0 rounded-full filter blur-lg
        transition-all duration-700 group-hover:bg-amber-500/30" />
    </div>
  );
}