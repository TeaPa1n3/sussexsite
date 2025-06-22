import React from 'react';
import { LucideIcon } from 'lucide-react';

interface AnimatedIconProps {
  icon: LucideIcon;
  className?: string;
}

export function AnimatedIcon({ icon: Icon, className = '' }: AnimatedIconProps) {
  return (
    <div className="relative group">
      {/* Main icon with hover animation */}
      <Icon 
        className={`transform transition-all duration-300 group-hover:scale-110 
        group-hover:rotate-12 ${className}`}
      />
      
      {/* Glow effect */}
      <div className="absolute inset-0 bg-amber-500/0 rounded-full filter blur-md
        transition-all duration-300 group-hover:bg-amber-500/20" />
    </div>
  );
}