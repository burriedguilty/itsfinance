'use client';

import { useState, useEffect } from 'react';

interface SillyButtonAProps {
  onActivate: () => void;
  isActive?: boolean;
  className?: string;
}

export default function SillyButtonA({ onActivate, isActive: externalIsActive = false, className = '' }: SillyButtonAProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showChaos, setShowChaos] = useState(false);

  useEffect(() => {
    if (externalIsActive) {
      const timer = setTimeout(() => {
        setShowChaos(true);
      }, 2500);
      return () => clearTimeout(timer);
    } else {
      setShowChaos(false);
    }
  }, [externalIsActive]);

  const handleClick = () => {
    setIsAnimating(true);
    onActivate();
    
    // Reset animation
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="fixed bottom-8 left-28 z-[999] group">
      <button
        onClick={handleClick}
        className={`
          w-16 h-16 rounded-full
          bg-[#001428] border-2 border-blue-400/50
          text-blue-300 hover:border-blue-300 hover:text-blue-100
          transition-all duration-300
          font-arial tracking-wider text-sm
          shadow-md shadow-blue-500/30
          button-glow flex items-center justify-center
          ${isAnimating ? 'animate-pulse' : ''}
          ${externalIsActive ? 'bg-opacity-75 border-red-400/50 text-red-300 hover:border-red-300 hover:text-red-100' : ''}
          ${showChaos ? 'animate-[button-chaos_0.3s_infinite]' : ''}
          hover:scale-110
          ${className}
        `}
        disabled={false}
      >
        {externalIsActive ? 'NORMAL MODE' : 'DONT CLICK'}
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
