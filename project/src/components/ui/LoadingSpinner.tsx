import React from 'react';

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* Progress bar container */}
      <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
        {/* Animated progress bar */}
        <div className="h-full bg-amber-500 rounded-full animate-loading-progress" />
      </div>
      <p className="text-gray-400 text-sm">Loading polls...</p>
    </div>
  );
}