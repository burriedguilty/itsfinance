'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';

// Define the effect types
type EffectType = 'spin' | 'bounce' | 'glitch' | 'rainbow' | 'shake';

interface SillyButtonProps {
  className?: string;
}

const pageEffects: Record<string, EffectType> = {
  '/': 'spin',
  '/pfpmaker': 'bounce',
  '/aiimagery': 'glitch',
  '/finance': 'rainbow',
  '/homepage': 'shake'
};

export default function SillyButton({ className = '' }: SillyButtonProps) {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(false);
  const currentEffect = pageEffects[pathname] || 'spin';

  const getEffectClass = () => {
    if (!isActive) return '';
    
    switch (currentEffect) {
      case 'spin':
        return 'animate-spin';
      case 'bounce':
        return 'animate-bounce';
      case 'glitch':
        return 'animate-glitch';
      case 'rainbow':
        return 'animate-rainbow';
      case 'shake':
        return 'animate-shake';
      default:
        return '';
    }
  };

  const handleClick = () => {
    setIsActive(true);
    // Reset after animation
    setTimeout(() => setIsActive(false), 1000);
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
        ${getEffectClass()}
        ${className}
      `}
    >
      MAKE IT SILLY
    </button>
  );
}
