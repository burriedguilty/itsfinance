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
    }, 1000);
  };

  return (
    <button
      onClick={handleClick}
      className={`
        px-4 py-2 rounded-md
        bg-[#001428] border border-blue-400/50
        text-blue-300 hover:border-blue-300 hover:text-blue-100
        transition-all duration-300
        font-mono tracking-wider text-sm
        shadow-lg shadow-blue-500/20
        button-glow
        ${isActive ? 'animate-spin' : ''}
        ${className}
      `}
    >
      MAKE IT SILLY
    </button>
  );
}
