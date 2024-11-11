import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center p-16">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-purple-500/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-t-purple-500 rounded-full animate-spin"></div>
      </div>
    </div>
  );
}