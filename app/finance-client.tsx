'use client';

import dynamic from 'next/dynamic';

// Import components with dynamic loading for client components
const LogoCenter = dynamic(() => import('@/components/LogoCenter'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });
const DitheredBg = dynamic(() => import('@/components/DitheredBg'), { ssr: false });
const VerticalRandomText = dynamic(() => import('@/components/VerticalRandomText'), { ssr: false });
const FinanceEntryText = dynamic(() => import('@/components/FinanceEntryText'), { ssr: false });

export default function FinanceClient() {
  return (
    <div className="bg-background h-screen overflow-hidden relative">
      {/* Dithered background effect - should be first in the DOM */}
      <DitheredBg primaryColor="#001122" secondaryColor="#000814" patternSize={4} />
      
      {/* Section for vertical text - separate from main content */}
      <section className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <VerticalRandomText />
      </section>
      
      {/* Logo container centered in viewport */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="z-10 w-auto h-auto">
          <LogoCenter 
            glowIntensity="high" 
            glowColor="#FFFFFF" 
            animationSpeed="medium" 
          />
        </div>
      </div>
      
      {/* Finance Entry Text in completely separate div below logo */}
      <div className="absolute bottom-1/4 w-full flex justify-center z-10">
        <FinanceEntryText delay={2000} typingSpeed={50} />
      </div>
      
      {/* Footer fixed at bottom */}
      <div className="absolute bottom-0 w-full z-10">
        <Footer />
      </div>
    </div>
  );
}
