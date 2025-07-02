'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './LogoCenter.module.css';

export default function LogoCenter() {
  const [isVisible, setIsVisible] = useState(false);
  const [videoSrc, setVideoSrc] = useState('');

  useEffect(() => {
    // Detect Safari browser and orientation
    const detectBrowserAndOrientation = () => {
      const ua = window.navigator.userAgent;
      const iOS = /iPad|iPhone|iPod/.test(ua) || 
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      const isSafariBrowser = /^((?!chrome|android).)*safari/i.test(ua) || iOS;
      const isPortraitMode = window.innerHeight > window.innerWidth;
      
      // Set video source based on detection
      if (isSafariBrowser || isPortraitMode) {
        setVideoSrc('/financeios.mov');
      } else {
        setVideoSrc('/finance.webm');
      }
    };
    
    // Set initial values
    detectBrowserAndOrientation();
    
    // Listen for orientation changes
    window.addEventListener('resize', detectBrowserAndOrientation);
    
    // Delay the appearance of the logo for a smoother page load
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', detectBrowserAndOrientation);
    };
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
          {/* Logo container */}
          <div className="relative flex flex-col items-center">
            {/* No SVG filters needed for PNG */}
            
            {/* Logo */}
            <div className={styles.logoContainer}>
              {/* Logo */}
              <div className={`relative z-10 ${styles.responsiveLogo}`}>
                {/* Video with dynamically selected source */}
                <video
                  className={`w-full h-full object-contain ${styles.glowEffect}
                    ${isVisible ? styles.visible : ''}
                  `}
                  src={videoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{ 
                    animation: `${styles.intenseBlink} 1.12s infinite`,
                    backgroundColor: 'transparent'
                  }}
                >
                  {/* Fallback */}
                  <div className="w-full h-full relative">
                    <Image
                      src="/finance.png"
                      alt="FINANCE"
                      fill
                      style={{ objectFit: 'contain' }}
                      priority
                    />
                  </div>
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
