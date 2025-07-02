'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './LogoCenter.module.css';

export default function LogoCenter() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileOrSafari, setIsMobileOrSafari] = useState(false);

  useEffect(() => {
    // Detect if the browser is Safari or mobile device
    const detectBrowser = () => {
      if (typeof window !== 'undefined') {
        const ua = window.navigator.userAgent;
        const iOS = /iPad|iPhone|iPod/.test(ua) || 
          (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
        const isSafari = /^((?!chrome|android).)*safari/i.test(ua);
        const isPortrait = window.innerHeight > window.innerWidth;
        
        // Set to true for Safari, iOS devices, or portrait mode (likely mobile)
        setIsMobileOrSafari(isSafari || iOS || isPortrait);
      }
    };
    
    detectBrowser();
    
    // Update on resize (orientation change)
    window.addEventListener('resize', detectBrowser);

    
    // Delay the appearance of the logo for a smoother page load
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', detectBrowser);
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
                {isMobileOrSafari ? (
                  /* For Safari and mobile devices - PNG image with transparency */
                  <div className="w-full h-full relative bg-transparent">
                    <Image
                      src="/financeapng.png"
                      alt="FINANCE"
                      fill
                      style={{ 
                        objectFit: 'contain',
                        animation: `${styles.intenseBlink} 1.12s infinite`,
                        backgroundColor: 'transparent',
                        mixBlendMode: 'screen'
                      }}
                      priority
                      className={`${styles.glowEffect} ${isVisible ? styles.visible : ''}`}
                      unoptimized={true}
                    />
                  </div>
                ) : (
                  /* For all other devices - WebM video with transparency */
                  <video
                    src="/finance.webm"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={`w-full h-full object-contain ${styles.glowEffect}
                      ${isVisible ? styles.visible : ''}
                    `}
                    style={{ 
                      animation: `${styles.intenseBlink} 1.12s infinite`,
                      backgroundColor: 'transparent'
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
