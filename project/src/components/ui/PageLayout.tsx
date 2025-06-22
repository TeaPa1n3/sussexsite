import React from 'react';

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="relative min-h-screen bg-gray-900 flex">
      {/* Left background image */}
      <div className="hidden lg:block w-1/3 fixed left-0 top-0 bottom-0">
        <img 
          src="https://lh3.googleusercontent.com/pw/AP1GczOVrYmnq3gF12kMOjFV2tmIWSnTy817CXW5lbUtV85j5y7MRds3S-8HmXPhBtTSzoKG4Hdpup0YtrmvG6f1aSiIIxmBMBzv5Xf4k-8oVEMA-9S_zyZFO0uxyk-IFhcc-Ve8wnprM9rMZONQq0R32MKB"
          alt="Medieval Background Left"
          className="w-full h-full object-cover grayscale scale-x-[-1]"
        />
        {/* Multi-layered gradient overlay for seamless blend */}
        <div className="absolute inset-0">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-l from-gray-900 via-gray-900/95 to-transparent" style={{ width: '200%' }} />
          {/* Edge blend gradient */}
          <div className="absolute inset-0 bg-gradient-to-l from-gray-900 via-gray-900/80 to-transparent" />
          {/* Noise texture for better blending */}
          <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-overlay" />
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 relative z-10">
        {children}
      </div>

      {/* Right background image */}
      <div className="hidden lg:block w-1/3 fixed right-0 top-0 bottom-0">
        <img 
          src="https://lh3.googleusercontent.com/pw/AP1GczPqFmJE1-RV-yVvEuW_6nsEEEbjCKZGNX_QWasN4TlNkdsAxPOSq4w2xErwOGrOGYiyletyT0ByGuHejEG5hdHxDZyoIWFqcDZpSrgC26NqW3VTLskQ3aSsY-o7FZjmngHo1SYV98YtEeLf9BLwJdQq"
          alt="Medieval Background Right"
          className="w-full h-full object-cover grayscale"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent" />
      </div>
    </div>
  );
}