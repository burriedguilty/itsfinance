'use client';

import { useState } from 'react';

interface SillyButtonBProps {
  onActivate: () => void;
  isActive?: boolean;
}

export default function SillyButtonB({ onActivate, isActive: externalIsActive = false }: SillyButtonBProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showSillyEffects, setShowSillyEffects] = useState(false);

  const handleClick = () => {
    if (!externalIsActive) {
      // Going into FINANCE MODE
      setIsAnimating(true);
      setShowSillyEffects(false);
      
      // Immediate music
      onActivate();

      // Button animation
      setTimeout(() => {
        setIsAnimating(false);
      }, 300);

      // Enable silly effects after 2 seconds
      setTimeout(() => {
        setShowSillyEffects(true);
      }, 2000);
    } else {
      // Return to normal mode immediately
      setIsAnimating(true);
      setShowSillyEffects(false);
      onActivate();
      
      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    }
  };

  return (
    <div className="fixed bottom-8 left-8 z-[999] group">
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
          ${externalIsActive ? 'bg-red-900/80 text-red-100 border-red-400/50' : ''}
          ${externalIsActive && !showSillyEffects ? 'animate-pulse' : ''}
          ${externalIsActive && showSillyEffects ? 'chaos-shake-hard' : ''}
          hover:scale-110
        `}
      >
        <span
  className={`
    flex flex-col items-center justify-center w-full h-full
    text-[0.5rem] sm:text-[0.55rem] leading-none
    font-semibold tracking-wide
    transform transition-transform
    ${isAnimating ? 'animate-bounce' : ''}
    ${externalIsActive && showSillyEffects ? 'chaos-colors chaos-text-wave' : ''}
  `}
  style={{ fontSize: '0.5rem', textAlign: 'center', lineHeight: 1, padding: '0 2px' }}
>
  {externalIsActive ? (
    <>
      NORMAL
      <br />
      MODE
    </>
  ) : (
    <>
      FINANCE
      <br />
      MODE
    </>
  )}
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
