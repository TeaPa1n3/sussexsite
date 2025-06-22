import React from 'react';
import type { IconProps } from './types';

export function TentIcon({ className = '' }: IconProps) {
  return (
    <div className={`relative group ${className}`}>
      <svg
        viewBox="0 0 24 24"
        className="transform transition-all duration-700 group-hover:scale-110"
      >
        {/* Tent base with unfurling animation */}
        <path
          d="M2 20L12 4l10 16H2z"
          className="fill-none stroke-current group-hover:animate-unfurl"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Tent entrance with fade-in effect */}
        <path
          d="M12 4v16"
          className="fill-none stroke-current opacity-50 group-hover:opacity-100 transition-opacity duration-500"
          strokeWidth="1.5"
        />
        
        {/* Decorative banner */}
        <path
          d="M7 12h10"
          className="fill-none stroke-current opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          strokeWidth="1.5"
          strokeDasharray="20"
          strokeDashoffset="20"
          style={{ animation: 'write 1.5s ease-out 0.5s forwards' }}
        />
      </svg>
      
      {/* Enhanced glow effect */}
      <div className="absolute inset-0 bg-amber-500/0 rounded-full filter blur-lg
        transition-all duration-700 group-hover:bg-amber-500/30" />
    </div>
  );
}