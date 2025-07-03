'use client';

import { useApp } from '@/context/AppContext';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import MediaGallery from '@/components/MediaGallery';
import ComingSoonPopup from '@/components/ComingSoonPopup';

import '@/styles/metallic.css';
import '@/styles/video-container.css';
import '@/styles/text-glow.css';
import '@/styles/button-glow.css';
import '@/styles/marquee.css';
import '@/styles/glitch.css';
import '@/styles/status-effects.css';

import '@/styles/neon-border.css';
import ChaosRain from '@/components/ChaosRain';
import SillyBackground from '@/components/SillyBackground';
import { mainBackground } from '@/config/sillyVideos';
const VerticalRandomText = dynamic(() => import('@/components/VerticalRandomText'), { ssr: false });
const GlitchMarquee = dynamic(() => import('@/components/GlitchMarquee'), { ssr: false });

// Import components with dynamic loading
// const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });

function AnimatedTextCycle({ phrases, isSillyMode }: { phrases: string[], isSillyMode: boolean }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Use refs instead of state for animation values to avoid re-renders
  const glowRef = useRef<HTMLDivElement>(null);
  
  // Text cycling effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        setIsAnimating(false);
      }, 500); // Fade out duration
    }, 3000); // Change text every 3 seconds

    return () => {
      clearInterval(interval);
    };
  }, [phrases.length]);

  // Rapid blinking glow effect using CSS animation instead of state updates
  useEffect(() => {
    if (!glowRef.current) return;
    
    // Store the ref value inside the effect to use in cleanup
    const currentGlowRef = glowRef.current;
    
    // Add a CSS class for animation instead of constantly updating state
    currentGlowRef.classList.add('text-glow-animation');
    
    return () => {
      // Use the stored value in cleanup
      currentGlowRef.classList.remove('text-glow-animation');
    };
  }, []);

  const chaosEffect = isSillyMode ? [
    'chaos-text-jump',
    'chaos-text-wave',
    'chaos-text-spin',
    'chaos-colors',
    'chaos-text-wave'
  ][currentIndex % 5] : '';

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div 
        ref={glowRef}
        className={`text-3xl transition-opacity duration-500 text-glow-animation ${isAnimating ? 'opacity-0' : 'opacity-100'} ${chaosEffect}`}

        style={{ 
          '--chaos-duration': `${Math.random() * 1.5 + 0.5}s`, 
          '--chaos-delay': `${Math.random()}s`
        } as React.CSSProperties}
      >
        {phrases[currentIndex]}
      </div>
    </div>
  );

}

export default function Homepage() {
  const { isSillyMode } = useApp();
  const [showMemeSection, setShowMemeSection] = useState(false);
  const [showPfpPopup, setShowPfpPopup] = useState(false);

  return (
    <div className={`bg-background min-h-screen overflow-x-hidden relative pb-20 md:pb-0 ${isSillyMode ? 'chaos-mode' : ''}`}>
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

      {/* Silly Mode Effects */}
      <SillyBackground 
        isActive={isSillyMode} 
      />
      <ChaosRain isActive={isSillyMode} />
      <section className="fixed inset-0 pointer-events-none z-10">
        <VerticalRandomText />
      </section>
      
      {/* Header */}
      <header className={`sticky top-0 z-30 w-full border-b border-secondary/30 transition-all duration-500 ${isSillyMode ? 'bg-black/30 backdrop-blur-sm chaos-shake-hard' : 'bg-black/70 backdrop-blur-sm'}`}>
        <div className={`container mx-auto px-4 py-2 flex items-center justify-between ${isSillyMode ? 'chaos-shake-hard' : ''}`} style={{ '--chaos-duration': `${Math.random() * 0.5 + 0.3}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
          <div className={`flex items-center gap-2 ${isSillyMode ? 'chaos-shake-hard' : ''}`} style={{ '--chaos-duration': `${Math.random() * 0.5 + 0.3}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
            <a href="https://itsjust.finance" className={isSillyMode ? 'chaos-zoom' : ''}>
              <Image
                src="/finance.png"
                alt="Finance Logo"
                width={48}
                height={48}
                className={isSillyMode ? 'chaos-colors' : ''}
              />
            </a>
          </div>
          
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setShowMemeSection(!showMemeSection)}
              className={`px-3 py-0.5 text-xs md:px-4 md:py-1 md:text-sm bg-[#001428] border border-blue-400/50 text-blue-300 hover:border-blue-300 hover:text-blue-100 hover:shadow-[0_0_15px_rgba(96,165,250,0.6)] transition-all duration-300 rounded-md font-georgia tracking-wider shadow-sm shadow-blue-500/20 relative ${isSillyMode ? 'chaos-bounce chaos-colors chaos-border bg-opacity-30 backdrop-blur-sm' : ''}`}
            >
              MEMES
            </button>
            <button 
              onClick={() => setShowPfpPopup(true)}
              className={`px-3 py-0.5 text-xs md:px-4 md:py-1 md:text-sm bg-[#001428] border border-blue-400/50 text-blue-300 hover:border-blue-300 hover:text-blue-100 hover:shadow-[0_0_15px_rgba(96,165,250,0.6)] transition-all duration-300 rounded-md font-georgia tracking-wider shadow-sm shadow-blue-500/20 relative ${isSillyMode ? 'chaos-bounce chaos-colors chaos-border bg-opacity-30 backdrop-blur-sm' : ''}`}
            >
              PFP MAKER
            </button>
          </div>

        </div>
      </header>




      {/* Main content */}
      <main className={`container mx-auto px-4 py-8 relative z-30 ${isSillyMode ? 'chaos-distort' : ''}`} style={{ '--chaos-duration': `${Math.random() * 2 + 1}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
        {/* Mobile-only Financial World Order Section - Will appear first on mobile */}
        <div className="block md:hidden mb-6">
          <div className={`bg-gradient-to-br from-[#001830] to-[#000c24] neon-border p-4 transition-all duration-500 ${isSillyMode ? 'chaos-opacity bg-opacity-30 backdrop-blur-sm' : ''}`}>
            <div className="text-center mb-3">
              <h2 className={`!font-georgia text-2xl text-blue-300 mb-1 ${isSillyMode ? 'chaos-text-wave' : ''}`} style={{ '--chaos-duration': `${Math.random() * 1.5 + 0.5}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
                WELCOME TO THE FINANCIAL WORLD ORDER
              </h2>
              <div className={`status-text recording text-sm font-georgia ${isSillyMode ? 'chaos-text-spin chaos-colors' : ''}`} style={{ '--chaos-duration': `${Math.random() * 2 + 1}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
                FINANCE RUNS EVERYTHING
              </div>
            </div>
            
            <div className="space-y-4 text-blue-100 font-georgia">
              <p className="text-center">
                First it was salt, then gold, then paper backed by gold, then just paper.
              </p>
              <p className="text-center font-bold">
                NOW IT&apos;S FUCK YOU. PEASANT.
              </p>
              <p className="text-center">
                They print, you work. They fake debt, you pay it.
              </p>
              <p className="text-center">
                Wake the fuck up and switch the narrative. Finance isn&apos;t controlled. Finance isn&apos;t taxed.
              </p>
              <p className="text-center">
                FINANCE runs on hopium, risk, and size. No rules. No ceiling. No brakes.
              </p>
              <p className="text-center">
                We are not suggesting. We are highjacking the economy.
              </p>
              <p className="text-center">
                Visible. Psychotic. On chain.
              </p>
            </div>
            
            <div className="mt-4 flex justify-center">
              <div className="w-full max-w-xs">
                <video 
                  src="/vid1.mp4" 
                  className={`w-full h-auto filter drop-shadow-[0_0_8px_rgba(96,165,250,0.2)] ${isSillyMode ? 'chaos-zoom' : ''}`} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                />
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <div className="inline-block text-blue-100 font-georgia text-lg font-medium animate-pulse-glow">
                TRILLIONS • 富は健康 • TRILLIONS
              </div>
            </div>
          </div>
        </div>
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 ${isSillyMode ? 'chaos-shake-hard' : ''}`} style={{ '--chaos-duration': `${Math.random() * 0.5 + 0.3}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
          {/* Left sidebar */}
          <div className={`space-y-4 block ${isSillyMode ? 'chaos-random' : ''}`} style={{ '--random-duration': `${Math.random() * 3 + 1}s` } as React.CSSProperties}>
            <div className={`bg-gradient-to-br from-[#001830] to-[#000c24] neon-border p-4 transition-all duration-500 ${isSillyMode ? 'chaos-opacity bg-opacity-30 backdrop-blur-sm' : ''}`} style={{ '--chaos-duration': `${Math.random() * 2 + 2}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
              <div className="relative h-[40px] mb-4 flex justify-center">
                <div className={isSillyMode ? 'chaos-flip' : ''}>
                  <div className={isSillyMode ? 'chaos-text-wave' : ''} style={{ '--chaos-duration': `${Math.random() * 1.5 + 0.5}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
                    <h2 className="!font-georgia text-xl md:text-2xl text-blue-300 mb-2 uppercase text-center">
                      FINANCE RUNS EVERYTHING
                    </h2>
                  </div>
                </div>
              </div>
              <div className="text-blue-100 font-mono text-sm space-y-3 text-center">
                <p className="text-blue-100 font-georgia text-base mb-2">Finance is the core of the entire planet.</p>
                <p><span className="font-bold">Every war?</span> Financed.<br/>
                <span className="font-bold">Debt?</span> Financed.<br/>
                <span className="font-bold">Goverment budgets?</span> Financed.<br/>
                <span className="font-bold">Your freedom?</span> Leased with interest.</p>
                <p className="mt-2">It’s not a just a system.<br/>It’s a parasite wearing a tie pulling your strings.</p>
                <p className="font-bold text-white mt-4 drop-shadow-[0_0_12px_rgba(147,197,253,0.9)] animate-pulse-glow uppercase tracking-wider break-words">FUCK THE SYSTEM AND RECLAIM YOUR FREEDOM.</p>
              </div>
            </div>
            <div className={`bg-gradient-to-br from-[#001830] to-[#000c24] neon-border p-4 transition-all duration-500 ${isSillyMode ? 'chaos-opacity bg-opacity-30 backdrop-blur-sm' : ''}`} style={{ '--chaos-duration': `${Math.random() * 2 + 2}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
              <div className="flex justify-center mb-1">
                <div className={isSillyMode ? 'chaos-text-wave' : ''} style={{ '--chaos-duration': `${Math.random() * 1.5 + 0.5}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
                  <h2 className="!font-georgia text-2xl text-blue-300 mb-1">
                    THE INDUSTRY
                  </h2>
                </div>
              </div>
              <div className="text-blue-100 font-georgia leading-relaxed drop-shadow-[0_0_2px_rgba(147,197,253,0.3)] space-y-5 text-sm text-center max-w-sm mx-auto">
                <p className={`text-blue-100 ${isSillyMode ? 'chaos-text-wave' : ''}`} style={{ '--chaos-duration': `${Math.random() * 1.5 + 0.5}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
                  finance taps into the bloodstream of the world.
                </p>
                <div className={`text-blue-100 ${isSillyMode ? 'chaos-text-jump' : ''}`} style={{ '--chaos-duration': `${Math.random() * 0.5 + 0.5}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
                  every loan, every war, every government check —<br />
                  financed.
                </div>
                <div className={`text-blue-100 ${isSillyMode ? 'chaos-text-spin' : ''}`} style={{ '--chaos-duration': `${Math.random() * 2 + 1}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
                  this is a trillion-dollar parasite. and we tokenized it.
                </div>
                <div className="h-4"></div>
              </div>
            </div>
            <div className={`bg-gradient-to-br from-[#001830] to-[#000c24] neon-border p-4 transition-all duration-500 ${isSillyMode ? 'chaos-opacity bg-opacity-30 backdrop-blur-sm' : ''}`} style={{ '--chaos-duration': `${Math.random() * 2 + 2}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
              <div className="flex justify-center items-center w-full mb-1">
                <div className={`w-full text-center ${isSillyMode ? 'chaos-text-wave' : ''}`} style={{ '--chaos-duration': `${Math.random() * 1.5 + 0.5}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
                  <h2 className="!font-georgia text-2xl text-blue-300 mb-1 mx-auto">
                    FINANCE IS:
                  </h2>
                </div>
              </div>
              <div className="text-blue-100 font-georgia leading-relaxed drop-shadow-[0_0_2px_rgba(147,197,253,0.3)] text-center w-full max-w-sm mx-auto pt-0 mt-0 flex items-center justify-center min-h-[4rem] md:min-h-[7rem]">
                <AnimatedTextCycle 
                  phrases={[
                    'a ritual',
                    'pure belief',
                    'digital cocaine',
                    'power',
                    'everywhere',
                    'never enough',
                    'the truth'
                  ]}
                  isSillyMode={isSillyMode}
                />
                <div className="h-4"></div>
              </div>
            </div>
          </div>
          
          {/* Main feature */}
          <div className="hidden md:block col-span-1 lg:col-span-2 space-y-6">
            <div className={`bg-gradient-to-br from-[#001830] to-[#000c24] neon-border p-6 transition-all duration-500 ${isSillyMode ? 'chaos-opacity bg-opacity-30 backdrop-blur-sm' : ''}`}>
              <div className={`mb-8 ${isSillyMode ? 'chaos-shake-hard' : ''}`} style={{ '--chaos-duration': `${Math.random() * 0.5 + 0.3}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
                <div className="w-full">
                  <h2 className={`!font-georgia text-2xl md:text-3xl text-blue-300 w-full text-center mb-2 ${isSillyMode ? 'chaos-text-spin' : ''}`} style={{ '--chaos-duration': `${Math.random() * 2 + 1}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
                    WELCOME TO THE FINANCIAL WORLD ORDER
                  </h2>
                  <span className={`status-text recording text-sm font-georgia w-full text-center block ${isSillyMode ? 'chaos-text-spin chaos-colors' : ''}`} style={{ '--chaos-duration': `${Math.random() * 2 + 1}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
                    FINANCE RUNS EVERYTHING
                  </span>
                </div>
              </div>
              <div className={`relative flex flex-col md:flex-row gap-8 ${isSillyMode ? 'chaos-distort' : ''}`} style={{ '--chaos-duration': `${Math.random() * 2 + 1}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
                <div className={`w-full md:w-1/2 ${isSillyMode ? 'chaos-pulse-grow' : ''}`} style={{ '--chaos-duration': `${Math.random() * 2 + 2}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
                  <div className="flex flex-col justify-start h-full pt-0">
                    <div className={`flex flex-col items-center w-full gap-4 text-blue-100 font-georgia text-[calc(1rem-0.5pt)] tracking-wide ${isSillyMode ? 'chaos-text-wave' : ''}`} style={{ '--chaos-duration': `${Math.random() * 1.5 + 0.5}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
                      <div className={`flex flex-col items-center w-full max-w-md mx-auto space-y-4 ${isSillyMode ? 'chaos-text-wave' : ''}`} style={{ '--chaos-duration': `${Math.random() * 1.5 + 0.5}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
                        <p className={`text-center leading-relaxed ${isSillyMode ? 'chaos-text-jump' : ''}`} style={{ '--chaos-duration': `${Math.random() * 0.5 + 0.5}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
                          First it was salt, then gold, then paper backed by gold, then just paper.
                        </p>
                        <p className={`text-center leading-relaxed ${isSillyMode ? 'chaos-text-wave' : ''}`} style={{ '--chaos-duration': `${Math.random() * 1.5 + 0.5}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
                          NOW IT&apos;S FUCK YOU. PEASANT.
                        </p>
                        <p className={`text-center leading-relaxed ${isSillyMode ? 'chaos-text-spin' : ''}`} style={{ '--chaos-duration': `${Math.random() * 2 + 1}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
                          They print, you work.
                          They fake debt, you pay it.
                        </p>
                        <p className={`text-center leading-relaxed ${isSillyMode ? 'chaos-text-jump' : ''}`} style={{ '--chaos-duration': `${Math.random() * 0.5 + 0.5}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
                          Wake the fuck up and switch the narrative.
                          Finance isn&apos;t controlled.
                          Finance isn&apos;t taxed.
                        </p>
                        <p className={`text-center leading-relaxed ${isSillyMode ? 'chaos-text-wave' : ''}`} style={{ '--chaos-duration': `${Math.random() * 1.5 + 0.5}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
                          FINANCE runs on hopium, risk, and size. No rules. No ceiling. No brakes.
                        </p>
                        <p className={`text-center leading-relaxed ${isSillyMode ? 'chaos-text-jump chaos-colors' : ''}`} style={{ '--chaos-duration': `${Math.random() * 0.5 + 0.5}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
                          We are not suggesting. We are highjacking the economy.
                        </p>
                        <p className={`text-center leading-relaxed ${isSillyMode ? 'chaos-text-spin' : ''}`} style={{ '--chaos-duration': `${Math.random() * 2 + 1}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
                          Visible. Psychotic. On chain.
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
                <div className={`hidden md:flex w-full md:w-1/2 bg-[#001020] rounded-lg overflow-hidden border border-blue-400/20 flex items-start justify-center p-4 pt-0 shadow-inner shadow-blue-500/10 transition-all duration-500 ${isSillyMode ? 'bg-opacity-30 backdrop-blur-sm' : ''} ${isSillyMode ? 'chaos-distort' : ''}`} style={{ '--chaos-duration': `${Math.random() * 2 + 1}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
                  <video 
                    src="/vid1.mp4" 
                    className={`w-full h-auto filter drop-shadow-[0_0_8px_rgba(96,165,250,0.2)] ${isSillyMode ? 'chaos-zoom' : ''}`} 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                  />
                </div>
              </div>

              {/* GlitchMarquee component */}
              <div className="mt-6 bg-transparent h-24">
                <GlitchMarquee />
              </div>
            </div>
          </div>
        </div>
        
        {/* Project AEON Section */}
        <div className={`mt-8 neon-border p-6 transition-all duration-500 relative overflow-hidden bg-gradient-to-br from-[#001830] to-[#000c24] ${isSillyMode ? 'chaos-opacity bg-opacity-30 backdrop-blur-sm chaos-bg' : ''}`}>
          <div className={`flex justify-between items-center mb-4 ${isSillyMode ? 'chaos-shake' : ''}`}>
            <h2 className="!font-georgia text-2xl md:text-4xl text-blue-300 mb-4">
              IT&apos;S NOT JUST FINANCE
            </h2>
            <span className={`status-text recording text-sm font-georgia ${isSillyMode ? 'chaos-colors chaos-bounce' : ''}`}>FINANCE RUNS EVERYTHING</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {/* Video Section */}
            <div className="flex justify-center">
              <div className={`relative w-fit ${isSillyMode ? 'chaos-distort' : ''}`} 
                style={{ '--chaos-duration': `${Math.random() * 2 + 1}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
                <div className="bg-[#001020] rounded-xl overflow-hidden border border-blue-400/20 shadow-lg shadow-blue-500/10 transition-all duration-500">
                  <video 
                    src="/vid2.mp4" 
                    className={`w-auto h-auto max-w-full ${isSillyMode ? 'chaos-zoom' : ''}`}
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                  />
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="flex flex-col justify-center">
              <div className="space-y-6 text-center mt-6 max-w-2xl mx-auto">
                <p className={`text-blue-100 font-georgia leading-relaxed drop-shadow-[0_0_2px_rgba(147,197,253,0.3)] text-lg ${isSillyMode ? 'chaos-colors chaos-text-spin' : ''}`} style={{ '--chaos-duration': `${Math.random() * 3 + 2}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
                  launched stealth on pump.fun. no presale. zero taxes. LP burnt. contract renounced. $FINANCE belongs to the people, forever. everything else inflates, but the total supply remains 1,000,000,000.
                </p>
                
                <p className={`text-blue-100 font-georgia leading-relaxed drop-shadow-[0_0_2px_rgba(147,197,253,0.3)] text-lg ${isSillyMode ? 'chaos-colors chaos-text-spin' : ''}`} style={{ '--chaos-duration': `${Math.random() * 3 + 2}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
                  finance isn&apos;t just a coin.<br />
                  it&apos;s a tokenized $500 trillion industry
                </p>
                
                <p className="finance-highlight">
                  <span className="animate-pulse-glow text-blue-100 font-georgia text-lg font-medium">
                    finance runs everything — now it runs on-chain.
                  </span>
                </p>
              </div>

              <div className={`mt-auto pt-8 flex flex-wrap gap-3 justify-center ${isSillyMode ? 'chaos-shake-hard' : ''}`} style={{ '--chaos-duration': `${Math.random() * 0.5 + 0.3}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
                <a 
                  href="https://x.com/FinanceCoinSOL" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`px-5 py-2 bg-[#001428] border border-blue-400/50 text-blue-300 hover:border-blue-300 hover:text-blue-100 transition-all duration-300 rounded-md font-georgia tracking-wider shadow-sm shadow-blue-500/20 button-glow font-georgia ${isSillyMode ? 'chaos-bounce chaos-colors chaos-border bg-opacity-30 backdrop-blur-sm' : ''}`}
                >
                  X
                </a>
                <a 
                  href="https://t.me/FinanceCoinSOL" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`px-5 py-2 bg-[#001428] border border-blue-400/50 text-blue-300 hover:border-blue-300 hover:text-blue-100 transition-all duration-300 rounded-md font-georgia tracking-wider shadow-sm shadow-blue-500/20 button-glow font-georgia ${isSillyMode ? 'chaos-bounce chaos-colors chaos-border bg-opacity-30 backdrop-blur-sm' : ''}`}
                >
                  TG
                </a>
                <a 
                  href="https://x.com/i/communities/1936427386675089602" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`px-5 py-2 bg-[#001428] border border-blue-400/30 text-blue-400 hover:border-blue-300 hover:text-blue-100 transition-all duration-300 rounded-md font-georgia tracking-wider shadow-sm shadow-blue-500/20 font-georgia ${isSillyMode ? 'chaos-bounce chaos-colors chaos-pulse-grow bg-opacity-30 backdrop-blur-sm' : ''}`}
                >
                  X COMMUNITY
                </a>
                <a 
                  href="https://jup.ag/tokens/FSQ4CBemMh7SBAC6odzCaRCvQZPc5i4QTLTFTSAdpump" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`px-5 py-2 bg-[#001428] border border-blue-400/30 text-blue-400 hover:border-blue-300 hover:text-blue-100 transition-all duration-300 rounded-md font-georgia tracking-wider shadow-sm shadow-blue-500/20 font-georgia ${isSillyMode ? 'chaos-bounce chaos-colors chaos-pulse-grow bg-opacity-30 backdrop-blur-sm' : ''}`}
                >
                  BUY
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Meme gallery popup */}
      {showMemeSection && (
        <MediaGallery onClose={() => setShowMemeSection(false)} />
      )}
      
      {/* PFP Maker coming soon popup */}
      <ComingSoonPopup 
        isOpen={showPfpPopup}
        onClose={() => setShowPfpPopup(false)}
        feature="PFP MAKER"
      />

      
      {/* Footer */}
    </div>
  );
}
