'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './LogoCenter.module.css';

interface LogoCenterProps {
  glowIntensity?: 'low' | 'medium' | 'high';
  glowColor?: string;
  animationSpeed?: 'slow' | 'medium' | 'fast';
}

export default function LogoCenter({ 
  glowIntensity = 'medium',
  glowColor = '#FFFFFF',
  animationSpeed = 'medium'
}: LogoCenterProps = {}) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Add a small delay before showing the logo for a nice entrance effect
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="relative z-10 flex items-center justify-center px-4">
      <div 
        className={`transition-all duration-1000 transform ${
          isVisible 
            ? 'opacity-100 scale-100' 
            : 'opacity-0 scale-90'
        }`}
      >
        <div className="relative">
          {/* Logo container with glow effect */}
          <div className="relative flex flex-col items-center">
            {/* SVG Filters for outer glow effect */}
            <svg width="0" height="0" style={{ position: 'absolute', visibility: 'hidden' }}>
              <defs>
                
                {/* White outer glow effect */}
                <filter id="outer-glow" x="-100%" y="-100%" width="300%" height="300%">
                  {/* Outer intense glow */}
                  <feMorphology 
                    operator="dilate" 
                    radius={glowIntensity === 'high' ? '6' : glowIntensity === 'medium' ? '5' : '3'} 
                    in="SourceAlpha" 
                    result="thicken1" 
                  />
                  <feGaussianBlur 
                    in="thicken1" 
                    stdDeviation={glowIntensity === 'high' ? '15' : glowIntensity === 'medium' ? '12' : '8'} 
                    result="blurred1" 
                  />
                  <feFlood 
                    floodColor={glowColor} 
                    floodOpacity={glowIntensity === 'high' ? '0.4' : glowIntensity === 'medium' ? '0.6' : '0.4'} 
                    result="glowColor1" 
                  />
                  <feComposite in="glowColor1" in2="blurred1" operator="in" result="strongGlow1" />

                  {/* Mid glow */}
                  <feMorphology 
                    operator="dilate" 
                    radius={glowIntensity === 'high' ? '4' : glowIntensity === 'medium' ? '3' : '2'} 
                    in="SourceAlpha" 
                    result="thicken2" 
                  />
                  <feGaussianBlur 
                    in="thicken2" 
                    stdDeviation={glowIntensity === 'high' ? '8' : glowIntensity === 'medium' ? '6' : '4'} 
                    result="blurred2" 
                  />
                  <feFlood 
                    floodColor={glowColor} 
                    floodOpacity={glowIntensity === 'high' ? '0.3' : glowIntensity === 'medium' ? '0.4' : '0.3'} 
                    result="glowColor2" 
                  />
                  <feComposite in="glowColor2" in2="blurred2" operator="in" result="strongGlow2" />

                  {/* Inner glow */}
                  <feMorphology 
                    operator="dilate" 
                    radius={glowIntensity === 'high' ? '2.5' : glowIntensity === 'medium' ? '2' : '1.5'} 
                    in="SourceAlpha" 
                    result="thicken3" 
                  />
                  <feGaussianBlur 
                    in="thicken3" 
                    stdDeviation={glowIntensity === 'high' ? '4' : glowIntensity === 'medium' ? '3' : '2'} 
                    result="blurred3" 
                  />
                  <feFlood 
                    floodColor={glowColor} 
                    floodOpacity={glowIntensity === 'high' ? '0.35' : glowIntensity === 'medium' ? '0.5' : '0.4'} 
                    result="glowColor3" 
                  />
                  <feComposite in="glowColor3" in2="blurred3" operator="in" result="strongGlow3" />

                  {/* Merge all glow layers */}
                  <feMerge>
                    <feMergeNode in="strongGlow1"/>
                    <feMergeNode in="strongGlow2"/>
                    <feMergeNode in="strongGlow3"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
            </svg>
            
            {/* Logo with outer glow effect */}
            <div className={styles.logoContainer}>
              {/* SVG Logo with outer glow filter applied */}
              <div className={`relative z-10 ${styles.responsiveLogo}`}>
                <Image
                  src="/finance.png"
                  alt="FINANCE"
                  fill
                  priority
                  sizes="(max-width: 768px) 90vw, (max-width: 1200px) 70vw, 700px"
                  className={`object-contain 
                    ${styles.svgOuterGlow} 
                    ${isVisible ? styles.visible : ''}
                    ${styles[`animation${animationSpeed.charAt(0).toUpperCase() + animationSpeed.slice(1)}`]}
                  `}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
