'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import SillyButtonA from '@/components/SillyButtonA';
import SillyBackground from '@/components/SillyBackground';
import ChaosRain from '@/components/ChaosRain';
import { mainBackground } from '@/config/sillyVideos';

// Import components with dynamic loading for client components
const LogoCenter = dynamic(() => import('@/components/LogoCenter'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });

const VerticalRandomText = dynamic(() => import('@/components/VerticalRandomText'), { ssr: false });
const FinanceEntryText = dynamic(() => import('@/components/FinanceEntryText'), { ssr: false });

export default function FinanceClient() {
  const [isSillyMode, setIsSillyMode] = useState(false);
  const [logoVariant, setLogoVariant] = useState(1);
  const [screenShakeVariant, setScreenShakeVariant] = useState(1);

  // Fungsi untuk mengubah variasi animasi secara random
  const changeAnimationVariants = useCallback(() => {
    if (isSillyMode) {
      const newLogoVariant = Math.floor(Math.random() * 3) + 1;
      const newScreenVariant = Math.floor(Math.random() * 4) + 1;
      setLogoVariant(newLogoVariant);
      setScreenShakeVariant(newScreenVariant);
      // Ubah variasi setiap 0.8-1.5 detik
      setTimeout(changeAnimationVariants, Math.random() * 700 + 800);
    }
  }, [isSillyMode]);
  useEffect(() => {
    if (isSillyMode) {
      changeAnimationVariants();
    }
  }, [isSillyMode, changeAnimationVariants]);

  return (
    <div 
      className={`bg-background h-screen overflow-hidden relative ${isSillyMode ? 'chaos-mode screen-shake' : ''}`}
      data-variant={screenShakeVariant}
    >
      {/* Background layers */}
      <div className="fixed inset-0 z-0">
        <video
          src={mainBackground.url}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      
      <SillyBackground 
        isActive={isSillyMode} 
        onVideoEnd={() => {
          setIsSillyMode(false);
        }} 
      />
      <ChaosRain isActive={isSillyMode} />
      
      {/* Silly Button at the top */}
      <div className="absolute top-8 right-8 z-20">
        <div className={isSillyMode ? 'button-shake' : ''}>
          <SillyButtonA 
            isActive={isSillyMode}
            onActivate={() => {
              setIsSillyMode(!isSillyMode);
              changeAnimationVariants();
            }} 
          />
        </div>
      </div>
      
      {/* Section for vertical text - separate from main content */}
      <section className={`absolute top-0 left-0 w-full h-full pointer-events-none ${isSillyMode ? 'chaos-colors' : ''}`}>
        <div className={isSillyMode ? 'text-pulse' : ''}>
          <VerticalRandomText />
        </div>
      </section>
      
      {/* Logo container centered in viewport */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className={`z-10 w-auto h-auto ${isSillyMode ? 'logo-beat chaos-colors' : ''}`}
          data-variant={logoVariant}
        >
          <LogoCenter />
        </div>
      </div>
      
      {/* Finance Entry Text in completely separate div below logo */}
      <div className="absolute bottom-1/4 w-full flex justify-center z-10">
        <div className={isSillyMode ? 'text-pulse' : ''}>
          <FinanceEntryText delay={2000} typingSpeed={50} />
        </div>
      </div>
      
      {/* Footer fixed at bottom */}
      <div className="absolute bottom-0 w-full z-10">
        <Footer />
      </div>
    </div>
  );
}
