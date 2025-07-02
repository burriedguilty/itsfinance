'use client';

import { useEffect, useState } from 'react';
import styles from './LogoCenter.module.css';

export default function LogoCenter() {
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
          {/* Logo container */}
          <div className="relative flex flex-col items-center">
            {/* No SVG filters needed for PNG */}
            
            {/* Logo */}
            <div className={styles.logoContainer}>
              {/* Logo */}
              <div className={`relative z-10 ${styles.responsiveLogo}`}>
                {/* Use Image component for better cross-platform compatibility */}
                <div 
                  className={`w-full h-full relative ${styles.glowEffect}
                    ${isVisible ? styles.visible : ''} ${styles.imageContainer || ''}
                  `}
                  style={{ 
                    animation: `${styles.intenseBlink} 1.12s infinite`,
                    backgroundColor: 'transparent'
                  }}
                >
                  <img
                    src="/finance.png" 
                    alt="FINANCE"
                    className="w-full h-full object-contain"
                    style={{
                      mixBlendMode: 'screen',
                      filter: 'brightness(1.2) contrast(1.1)'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
