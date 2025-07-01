'use client';

import { useApp } from '@/context/AppContext';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useState } from 'react';
import MediaGallery from '@/components/MediaGallery';

import '@/styles/metallic.css';
import '@/styles/video-container.css';
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

export default function Homepage() {
  const { isSillyMode } = useApp();
  const [showMemeSection, setShowMemeSection] = useState(false);

  return (
    <div className={`bg-background min-h-screen overflow-x-hidden relative ${isSillyMode ? 'chaos-mode' : ''}`}>
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
          
          <div className="flex items-center">
            <button 
              onClick={() => setShowMemeSection(!showMemeSection)}
              className={`px-4 py-1 bg-[#001428] border border-blue-400/50 text-blue-300 hover:border-blue-300 hover:text-blue-100 hover:shadow-[0_0_15px_rgba(96,165,250,0.6)] transition-all duration-300 rounded-md font-georgia tracking-wider shadow-sm shadow-blue-500/20 relative ${isSillyMode ? 'chaos-bounce chaos-colors chaos-border bg-opacity-30 backdrop-blur-sm' : ''}`}
            >
              MEME
            </button>
          </div>

        </div>
      </header>




      {/* Main content */}
      <main className={`container mx-auto px-4 py-8 relative z-30 ${isSillyMode ? 'chaos-distort' : ''}`} style={{ '--chaos-duration': `${Math.random() * 2 + 1}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 ${isSillyMode ? 'chaos-shake-hard' : ''}`} style={{ '--chaos-duration': `${Math.random() * 0.5 + 0.3}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
          {/* Left sidebar */}
          <div className={`space-y-4 ${isSillyMode ? 'chaos-random' : ''}`} style={{ '--random-duration': `${Math.random() * 3 + 1}s` } as React.CSSProperties}>
            <div className={`bg-gradient-to-br from-[#001830] to-[#000c24] neon-border p-4 transition-all duration-500 ${isSillyMode ? 'chaos-opacity bg-opacity-30 backdrop-blur-sm' : ''}`} style={{ '--chaos-duration': `${Math.random() * 2 + 2}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
              <div className="relative h-[24px] mb-4 flex justify-center">
                <div className={isSillyMode ? 'chaos-flip' : ''}>
                  <div className={isSillyMode ? 'chaos-text-wave' : ''} style={{ '--chaos-duration': `${Math.random() * 1.5 + 0.5}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
                    <h2 className="!font-georgia text-lg md:text-xl text-blue-300 mb-2">
                      THE SYSTEM BOWS TO FINANCE
                    </h2>
                  </div>
                </div>
              </div>
              <div className="text-blue-100 font-mono text-sm space-y-2">
                <div 
                  className={`flex items-center justify-between gap-2 ${isSillyMode ? 'chaos-random' : ''}`} 
                  style={{ '--random-duration': `${Math.random() * 2 + 1}s` } as React.CSSProperties}
                >
                  <span className={`text-blue-100/70 line-through ${isSillyMode ? 'chaos-colors chaos-text-wave' : ''}`} style={{ '--chaos-duration': `${Math.random() * 1.5 + 0.5}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>Elections?</span>
                  <span className={`text-blue-100/30 tracking-[.25em] text-center px-2 flex-1 ${isSillyMode ? 'chaos-vibrate' : ''}`} style={{ '--chaos-duration': `${Math.random() * 0.2 + 0.2}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>.......</span>
                  <span className={`font-medium text-blue-100 animate-pulse drop-shadow-[0_0_8px_rgba(147,197,253,0.8)] ${isSillyMode ? 'chaos-text-jump chaos-colors' : ''}`} style={{ '--chaos-duration': `${Math.random() * 0.5 + 0.5}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>financed.</span>
                </div>
                <div 
                  className={`flex items-center justify-between gap-2 ${isSillyMode ? 'chaos-random' : ''}`} 
                  style={{ '--random-duration': `${Math.random() * 2 + 1}s` } as React.CSSProperties}
                >
                  <span className={`text-blue-100/70 line-through ${isSillyMode ? 'chaos-colors chaos-text-wave' : ''}`} style={{ '--chaos-duration': `${Math.random() * 1.5 + 0.5}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>Wars?</span>
                  <span className={`text-blue-100/30 tracking-[.25em] text-center px-2 flex-1 ${isSillyMode ? 'chaos-vibrate' : ''}`} style={{ '--chaos-duration': `${Math.random() * 0.2 + 0.2}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>.......</span>
                  <span className={`font-medium text-blue-100 animate-pulse drop-shadow-[0_0_8px_rgba(147,197,253,0.8)] ${isSillyMode ? 'chaos-text-jump chaos-colors' : ''}`} style={{ '--chaos-duration': `${Math.random() * 0.5 + 0.5}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>financed.</span>
                </div>
                <div 
                  className={`flex items-center justify-between gap-2 ${isSillyMode ? 'chaos-random' : ''}`} 
                  style={{ '--random-duration': `${Math.random() * 2 + 1}s` } as React.CSSProperties}
                >
                  <span className={`text-blue-100/70 line-through ${isSillyMode ? 'chaos-colors chaos-text-wave' : ''}`} style={{ '--chaos-duration': `${Math.random() * 1.5 + 0.5}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>Religions?</span>
                  <span className={`text-blue-100/30 tracking-[.25em] text-center px-2 flex-1 ${isSillyMode ? 'chaos-vibrate' : ''}`} style={{ '--chaos-duration': `${Math.random() * 0.2 + 0.2}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>.......</span>
                  <span className={`font-medium text-blue-100 animate-pulse drop-shadow-[0_0_8px_rgba(147,197,253,0.8)] ${isSillyMode ? 'chaos-text-jump chaos-colors' : ''}`} style={{ '--chaos-duration': `${Math.random() * 0.5 + 0.5}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>financed.</span>
                </div>
                <div 
                  className={`flex items-center justify-between gap-2 ${isSillyMode ? 'chaos-random' : ''}`} 
                  style={{ '--random-duration': `${Math.random() * 2 + 1}s` } as React.CSSProperties}
                >
                  <span className={`text-blue-100/70 line-through ${isSillyMode ? 'chaos-colors chaos-text-wave' : ''}`} style={{ '--chaos-duration': `${Math.random() * 1.5 + 0.5}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>The house you&apos;re in?</span>
                  <span className={`text-blue-100/30 tracking-[.25em] text-center px-2 flex-1 ${isSillyMode ? 'chaos-vibrate' : ''}`} style={{ '--chaos-duration': `${Math.random() * 0.2 + 0.2}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>.......</span>
                  <span className={`font-medium text-blue-100 animate-pulse drop-shadow-[0_0_8px_rgba(147,197,253,0.8)] ${isSillyMode ? 'chaos-text-jump chaos-colors' : ''}`} style={{ '--chaos-duration': `${Math.random() * 0.5 + 0.5}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>financed.</span>
                </div>
              </div>
            </div>
            <div className={`bg-gradient-to-br from-[#001830] to-[#000c24] neon-border p-4 transition-all duration-500 ${isSillyMode ? 'chaos-opacity bg-opacity-30 backdrop-blur-sm' : ''}`} style={{ '--chaos-duration': `${Math.random() * 2 + 2}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
              <div className="flex justify-center mb-4">
                <div className={isSillyMode ? 'chaos-text-wave' : ''} style={{ '--chaos-duration': `${Math.random() * 1.5 + 0.5}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
                  <h2 className="!font-georgia text-2xl text-blue-300 mb-4">
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
              </div>
            </div>
            <div className={`bg-gradient-to-br from-[#001830] to-[#000c24] neon-border p-4 transition-all duration-500 ${isSillyMode ? 'chaos-opacity bg-opacity-30 backdrop-blur-sm' : ''}`} style={{ '--chaos-duration': `${Math.random() * 2 + 2}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
              <div className="flex justify-center items-center w-full mb-4">
                <div className={`w-full text-center ${isSillyMode ? 'chaos-text-wave' : ''}`} style={{ '--chaos-duration': `${Math.random() * 1.5 + 0.5}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
                  <h2 className="!font-georgia text-2xl text-blue-300 mb-4 mx-auto">
                    FINANCE IS:
                  </h2>
                </div>
              </div>
              <div className="text-blue-100 font-georgia leading-relaxed drop-shadow-[0_0_2px_rgba(147,197,253,0.3)] space-y-4 text-sm text-center max-w-sm mx-auto">
                <div className={`text-blue-100 ${isSillyMode ? 'chaos-text-jump' : ''}`} style={{ '--chaos-duration': `${Math.random() * 0.5 + 0.5}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
                  · everywhere
                </div>
                <div className={`text-blue-100 ${isSillyMode ? 'chaos-text-wave' : ''}`} style={{ '--chaos-duration': `${Math.random() * 1.5 + 0.5}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
                  · inevitable
                </div>
                <div className={`text-blue-100 ${isSillyMode ? 'chaos-text-spin' : ''}`} style={{ '--chaos-duration': `${Math.random() * 2 + 1}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
                  · ancient
                </div>
                <div className={`text-blue-100 ${isSillyMode ? 'chaos-text-jump' : ''}`} style={{ '--chaos-duration': `${Math.random() * 0.5 + 0.5}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
                  · running the world
                </div>
                <div className={`text-blue-100 ${isSillyMode ? 'chaos-text-wave' : ''}`} style={{ '--chaos-duration': `${Math.random() * 1.5 + 0.5}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
                  · spiritually necessary
                </div>
              </div>
            </div>
          </div>
          
          {/* Main feature */}
          <div className="lg:col-span-2">
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
                  <div className="flex flex-col justify-center h-full">
                    <div className={`flex flex-col items-center gap-4 text-blue-100 font-georgia text-lg tracking-wide ${isSillyMode ? 'chaos-text-wave' : ''}`} style={{ '--chaos-duration': `${Math.random() * 1.5 + 0.5}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
                      <div className={`flex flex-col items-center w-full max-w-md mx-auto space-y-4 ${isSillyMode ? 'chaos-text-wave' : ''}`} style={{ '--chaos-duration': `${Math.random() * 1.5 + 0.5}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
                        <p className={`text-center leading-relaxed ${isSillyMode ? 'chaos-text-jump' : ''}`} style={{ '--chaos-duration': `${Math.random() * 0.5 + 0.5}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
                          FINANCE is a symbol of financial domination. It controls perception, belief, access, and value.
                        </p>
                        <p className={`text-center leading-relaxed ${isSillyMode ? 'chaos-text-wave' : ''}`} style={{ '--chaos-duration': `${Math.random() * 1.5 + 0.5}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
                          The total value of global finance - every bond, stock, real estate contract was always hoarded by elites, behind glass. But $FINANCE cracked the vault.
                        </p>
                        <p className={`text-center leading-relaxed ${isSillyMode ? 'chaos-text-spin' : ''}`} style={{ '--chaos-duration': `${Math.random() * 2 + 1}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
                          You now you can hold a piece of the machinery. This new order? It runs in the open, fueled by belief, risk, and size.
                        </p>
                        <p className={`text-center leading-relaxed ${isSillyMode ? 'chaos-text-jump chaos-colors' : ''}`} style={{ '--chaos-duration': `${Math.random() * 0.5 + 0.5}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
                          We&apos;re not whispering. We&apos;re declaring. Loud. Public. Unstoppable.
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
                <div className={`w-full md:w-1/2 bg-[#001020] rounded-lg overflow-hidden border border-blue-400/20 flex items-center justify-center p-4 shadow-inner shadow-blue-500/10 transition-all duration-500 ${isSillyMode ? 'bg-opacity-30 backdrop-blur-sm' : ''} ${isSillyMode ? 'chaos-distort' : ''}`} style={{ '--chaos-duration': `${Math.random() * 2 + 1}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
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
              IT&apos;S JUST FINANCE
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
                  launched stealth on pump.fun. no presale. zero taxes. LP burnt. contract renounced. $FINANCE belongs to the people, forever. everything else inflates, but the total supply remains 1,000,000,000. forever.
                </p>
                
                <p className={`text-blue-100 font-georgia leading-relaxed drop-shadow-[0_0_2px_rgba(147,197,253,0.3)] text-lg ${isSillyMode ? 'chaos-colors chaos-text-spin' : ''}`} style={{ '--chaos-duration': `${Math.random() * 3 + 2}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
                  finance isn&apos;t just a coin.<br />
                  it&apos;s a $500 trillion industry tokenized.
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
                  href="https://x.com/i/communities/1936427386675089602" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`px-5 py-2 bg-[#001428] border border-blue-400/30 text-blue-400 hover:border-blue-300 hover:text-blue-100 transition-all duration-300 rounded-md font-georgia tracking-wider shadow-sm shadow-blue-500/20 font-georgia ${isSillyMode ? 'chaos-bounce chaos-colors chaos-pulse-grow bg-opacity-30 backdrop-blur-sm' : ''}`}
                >
                  X COMMUNITY
                </a>
                <a 
                  href="https://dexscreener.com/solana/9axdtk6m17kqnxemavqyocjmu57rsf6w9wgzbsdssg3u" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`px-5 py-2 bg-[#001428] border border-blue-400/30 text-blue-400 hover:border-blue-300 hover:text-blue-100 transition-all duration-300 rounded-md font-georgia tracking-wider shadow-sm shadow-blue-500/20 font-georgia ${isSillyMode ? 'chaos-bounce chaos-colors chaos-pulse-grow bg-opacity-30 backdrop-blur-sm' : ''}`}
                >
                  CHART
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* MEME Gallery Popup */}
      {showMemeSection && <MediaGallery onClose={() => setShowMemeSection(false)} />}
      

      
      {/* Footer */}
    </div>
  );
}
