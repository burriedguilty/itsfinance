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
  const [isLoading, setIsLoading] = useState(true);
  
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
      <div className="relative aspect-square bg-[#001020]">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-400"></div>
          </div>
        )}
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-contain rounded-lg transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
          onLoadingComplete={() => setIsLoading(false)}
        />
      </div>
    );
  }
  
  return (
    <div className="relative aspect-square glitch-container bg-[#001020]">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-400"></div>
        </div>
      )}
      <div className="glitch-image">

        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain rounded-lg"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
          onLoadingComplete={() => setIsLoading(false)}
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
