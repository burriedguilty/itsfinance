'use client';

import { useState } from 'react';

interface SillyButtonBProps {
  onActivate: () => void;
}

export default function SillyButtonB({ onActivate }: SillyButtonBProps) {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    if (isActive) return;
    setIsActive(true);
    
    // Trigger activation after a short delay
    setTimeout(() => {
      onActivate();
    }, 150);

    // Reset active state
    setTimeout(() => {
      setIsActive(false);
    }, 300);
  };

  return (
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
        ${isActive ? 'animate-pulse' : ''}
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
      disabled={isActive}
    >
      <span className={`
        inline-block transform transition-transform
        ${isActive ? 'animate-bounce' : ''}
      `}>
        MAKE IT SILLY
      </span>
      

    </button>
  );
}
