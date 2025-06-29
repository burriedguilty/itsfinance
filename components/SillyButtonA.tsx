'use client';

import { useState } from 'react';

interface SillyButtonAProps {
  onActivate: () => void;
  className?: string;
}

export default function SillyButtonA({ onActivate, className = '' }: SillyButtonAProps) {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(true);
    onActivate();
    
    // Reset after animation
    setTimeout(() => {
      setIsActive(false);
    }, 300);
  };

  return (
    <div className="group relative">
      <button
        onClick={handleClick}
        className={`
          px-4 py-2 rounded
          bg-[#001428] border border-blue-400/50
          text-blue-300 hover:border-blue-300 hover:text-blue-100
          transition-all duration-300
          font-mono tracking-wider text-sm
          shadow-lg shadow-blue-500/20
          button-glow
          ${isActive ? 'animate-pulse' : ''}
          ${className}
        `}
      >
        FINANCE MODE
      </button>
      
      {/* Warning tooltip */}
      <div className="
        absolute top-full left-1/2 -translate-x-1/2 mt-2
        px-3 py-1.5 rounded
        bg-red-950/90 border border-red-500/50
        text-red-300 font-mono text-xs
        shadow-lg shadow-red-500/20
        transform transition-all duration-200
        opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100
        pointer-events-none
      ">
        DON&apos;T CLICK ME
      </div>
    </div>
  );
}
