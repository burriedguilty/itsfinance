'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import '@/styles/glitch-image.css';

interface GlitchImageProps {
  src: string;
  alt: string;
  isGlitching?: boolean;
}

export default function GlitchImage({ src, alt, isGlitching = false }: GlitchImageProps) {
  const [glitchOffset, setGlitchOffset] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    if (!isGlitching) return;
    
    const interval = setInterval(() => {
      setGlitchOffset({
        x: Math.random() * 10 - 5,
        y: Math.random() * 10 - 5
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, [isGlitching]);
  
  if (!isGlitching) {
    return (
      <div className="relative aspect-square">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain rounded-lg"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>
    );
  }
  
  return (
    <div className="relative aspect-square glitch-container">
      <div className="glitch-image">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain rounded-lg"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
          style={{
            transform: `translate(${glitchOffset.x}px, ${glitchOffset.y}px)`
          }}
        />
      </div>
      <div 
        className="glitch-image glitch-r"
        style={{
          transform: `translate(${glitchOffset.x * -1.5}px, 0)`
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain rounded-lg"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>
      <div 
        className="glitch-image glitch-g"
        style={{
          transform: `translate(${glitchOffset.x * 1.5}px, 0)`
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain rounded-lg"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>
    </div>
  );
}
