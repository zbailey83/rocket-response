import React from 'react';

export const RocketLogo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* Flame - Animated */}
      <g className="animate-pulse origin-top">
        <path d="M50 78 L38 98 L50 88 L62 98 L50 78" fill="#ef4444" />
        <path d="M50 78 L44 88 L50 83 L56 88 L50 78" fill="#fbbf24" />
      </g>
      
      {/* Fins */}
      <path 
        d="M28 62 L15 82 L35 75 L32 60" 
        fill="#a1a1aa" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinejoin="round" 
        className="text-zinc-700 dark:text-zinc-300 fill-zinc-300 dark:fill-zinc-600" 
      />
      <path 
        d="M72 62 L85 82 L65 75 L68 60" 
        fill="#a1a1aa" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinejoin="round" 
        className="text-zinc-700 dark:text-zinc-300 fill-zinc-300 dark:fill-zinc-600" 
      />
      
      {/* Main Body */}
      <path 
        d="M50 5 C28 30 28 60 28 65 L35 75 L65 75 L72 65 C72 60 72 30 50 5Z" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinejoin="round"
        className="text-zinc-800 dark:text-zinc-200 fill-zinc-100 dark:fill-zinc-800" 
      />
      
      {/* Window */}
      <circle cx="50" cy="35" r="10" fill="#3b82f6" fillOpacity="0.2" stroke="currentColor" strokeWidth="2" className="text-zinc-800 dark:text-zinc-200" />
      <circle cx="50" cy="35" r="4" fill="#3b82f6" />

      {/* Mechanical Details */}
      <path d="M28 65 L72 65" stroke="currentColor" strokeWidth="2" className="text-zinc-800 dark:text-zinc-200" />
      <rect x="46" y="55" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1" fillOpacity="0" className="text-zinc-500" />
    </svg>
  );
};