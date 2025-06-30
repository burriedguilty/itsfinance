'use client';

import { useState } from 'react';

interface SillyButtonBProps {
  onActivate: () => void;
  isActive?: boolean;
}

export default function SillyButtonB({ onActivate, isActive: externalIsActive = false }: SillyButtonBProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    // Trigger activation after a short delay
    setTimeout(() => {
      onActivate();
    }, 150);

    // Reset animation state
    setTimeout(() => {
      setIsAnimating(false);
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
          shadow-sm shadow-blue-500/20
          button-glow
          ${isAnimating ? 'animate-pulse' : ''}
          ${externalIsActive ? 'bg-opacity-75 border-red-400/50 text-red-300 hover:border-red-300 hover:text-red-100' : ''}
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
        disabled={isAnimating}
      >
        <span className={`
          inline-block transform transition-transform
          ${isAnimating ? 'animate-bounce' : ''}
        `}>
          {externalIsActive ? 'NORMAL MODE' : 'FINANCE MODE'}
        </span>
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
