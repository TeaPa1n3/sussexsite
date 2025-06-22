import React from 'react';

interface ParchmentBoxProps {
  children: React.ReactNode;
  className?: string;
}

export function ParchmentBox({ children, className = '' }: ParchmentBoxProps) {
  return (
    <div className="relative group">
      {/* Decorative border */}
      <div className="absolute inset-0 bg-amber-900/10 border-2 border-amber-800/30 rounded-xl transform rotate-1" />
      
      {/* Parchment texture */}
      <div className={`relative p-6 bg-gray-900/80 rounded-xl 
        border border-amber-500/20 transform -rotate-1 transition-transform 
        group-hover:rotate-0 ${className}`}>
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}