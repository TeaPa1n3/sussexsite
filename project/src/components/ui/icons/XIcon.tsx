import React from 'react';

interface XIconProps {
  className?: string;
}

export function XIcon({ className = '' }: XIconProps) {
  return (
    <div className={`relative group ${className}`}>
      <svg
        viewBox="0 0 24 24"
        className="transform transition-all duration-700 group-hover:scale-110"
        fill="currentColor"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
      <div className="absolute inset-0 bg-amber-500/0 rounded-full filter blur-lg
        transition-all duration-700 group-hover:bg-amber-500/30" />
    </div>
  );
}