import React from 'react';

interface BattleWornBannerProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'header' | 'footer';
}

export function BattleWornBanner({ children, className = '', variant = 'header' }: BattleWornBannerProps) {
  return (
    <div className="relative">
      {/* Texture layers */}
      <div className="absolute inset-0 bg-stone-texture opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-900/70" />
      
      {/* Battle damage */}
      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.15] mix-blend-overlay" />
      
      {/* Content */}
      <div className={`relative z-10 ${className}`}>
        {children}
      </div>
    </div>
  );
}