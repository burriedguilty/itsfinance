'use client';

import { useApp } from '@/context/AppContext';
import dynamic from 'next/dynamic';
import Image from 'next/image';
// import MagneticVideoScroll from './MagneticVideoScroll';

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
                    MY REALITY IS PRICED IN
                  </h2>
                </div>
              </div>
              <div className="text-blue-100 font-georgia leading-relaxed drop-shadow-[0_0_2px_rgba(147,197,253,0.3)] space-y-3 text-sm text-center max-w-sm mx-auto">
                <p className={`text-blue-100 ${isSillyMode ? 'chaos-text-wave' : ''}`} style={{ '--chaos-duration': `${Math.random() * 1.5 + 0.5}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>Let&apos;s create something amazing together!</p>
                <div className={`text-blue-100 ${isSillyMode ? 'chaos-text-jump' : ''}`} style={{ '--chaos-duration': `${Math.random() * 0.5 + 0.5}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>That&apos;s how Finance works</div>
                <div className={`text-blue-100 ${isSillyMode ? 'chaos-text-spin' : ''}`} style={{ '--chaos-duration': `${Math.random() * 2 + 1}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>My timeline is denominated</div>
                <div className={`text-blue-100 ${isSillyMode ? 'chaos-text-wave' : ''}`} style={{ '--chaos-duration': `${Math.random() * 1.5 + 0.5}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>My thoughts are fractionalized</div>
                <div className={`text-blue-100 ${isSillyMode ? 'chaos-text-jump' : ''}`} style={{ '--chaos-duration': `${Math.random() * 0.5 + 0.5}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>Everything inflates</div>
                <div className={`text-blue-100 ${isSillyMode ? 'chaos-text-spin' : ''}`} style={{ '--chaos-duration': `${Math.random() * 2 + 1}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>It&apos;s a ritual</div>
              </div>
            </div>
            <div className={`bg-gradient-to-br from-[#001830] to-[#000c24] neon-border p-4 transition-all duration-500 ${isSillyMode ? 'chaos-opacity bg-opacity-30 backdrop-blur-sm' : ''}`} style={{ '--chaos-duration': `${Math.random() * 2 + 2}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
              <div className="flex justify-center mb-4">
                <div className={isSillyMode ? 'chaos-text-wave' : ''} style={{ '--chaos-duration': `${Math.random() * 1.5 + 0.5}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
                  <h2 className="!font-georgia text-2xl text-blue-300 mb-4">
                    FINANCE IS AROUND THE CLOCK
                  </h2>
                </div>
              </div>
              <div className="text-blue-100 font-georgia leading-relaxed drop-shadow-[0_0_2px_rgba(147,197,253,0.3)] space-y-3 text-sm text-center max-w-sm mx-auto">
                <div className={`text-blue-100 ${isSillyMode ? 'chaos-text-jump' : ''}`} style={{ '--chaos-duration': `${Math.random() * 0.5 + 0.5}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>24/7 isn&apos;t a grind</div>
                <p className={`text-blue-100 ${isSillyMode ? 'chaos-text-wave' : ''}`} style={{ '--chaos-duration': `${Math.random() * 1.5 + 0.5}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>Here&apos;s what you can do:</p>
                <p className={`text-blue-100 ${isSillyMode ? 'chaos-text-spin' : ''}`} style={{ '--chaos-duration': `${Math.random() * 2 + 1}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>Welcome to Finance&apos;s AI-powered image generation tool! This tool helps you create stunning images in minutes.</p>
                <div className={`text-blue-100 ${isSillyMode ? 'chaos-text-jump' : ''}`} style={{ '--chaos-duration': `${Math.random() * 0.5 + 0.5}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>Let&apos;s make your profile picture unique!</div>
                <div className={`text-blue-100 ${isSillyMode ? 'chaos-text-wave' : ''}`} style={{ '--chaos-duration': `${Math.random() * 1.5 + 0.5}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>Finance never stops because power doesn&apos;t sleep</div>
              </div>
            </div>
          </div>
          
          {/* Main feature */}
          <div className="lg:col-span-2">
            <div className={`bg-gradient-to-br from-[#001830] to-[#000c24] neon-border p-6 transition-all duration-500 ${isSillyMode ? 'chaos-opacity bg-opacity-30 backdrop-blur-sm' : ''}`}>
              <div className={`flex justify-between items-center mb-8 ${isSillyMode ? 'chaos-shake-hard' : ''}`} style={{ '--chaos-duration': `${Math.random() * 0.5 + 0.3}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
                <div className={isSillyMode ? 'chaos-text-spin' : ''} style={{ '--chaos-duration': `${Math.random() * 2 + 1}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
                  <h2 className="!font-georgia text-2xl md:text-3xl text-blue-300 mb-4">
                    WELCOME TO THE FINANCIAL WORLD ORDER
                  </h2>
                </div>
                <span className={`status-text recording text-sm font-georgia ${isSillyMode ? 'chaos-text-spin chaos-colors' : ''}`} style={{ '--chaos-duration': `${Math.random() * 2 + 1}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>FINANCE RUNS EVERYTHING</span>
              </div>
              <div className={`relative flex flex-col md:flex-row gap-8 ${isSillyMode ? 'chaos-distort' : ''}`} style={{ '--chaos-duration': `${Math.random() * 2 + 1}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
                <div className={`w-full md:w-1/2 ${isSillyMode ? 'chaos-pulse-grow' : ''}`} style={{ '--chaos-duration': `${Math.random() * 2 + 2}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
                  <div className="flex flex-col justify-center h-full">
                    <div className={`flex flex-col items-center gap-4 text-blue-100 font-georgia text-lg tracking-wide ${isSillyMode ? 'chaos-text-wave' : ''}`} style={{ '--chaos-duration': `${Math.random() * 1.5 + 0.5}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
                      <div className={`flex flex-col items-center gap-3 w-full max-w-sm mx-auto ${isSillyMode ? 'chaos-text-wave' : ''}`} style={{ '--chaos-duration': `${Math.random() * 1.5 + 0.5}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
                        <div className={`text-center ${isSillyMode ? 'chaos-text-jump' : ''}`} style={{ '--chaos-duration': `${Math.random() * 0.5 + 0.5}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
                          Finance is the religion
                        </div>
                        <div className={`text-center ${isSillyMode ? 'chaos-text-wave' : ''}`} style={{ '--chaos-duration': `${Math.random() * 1.5 + 0.5}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
                          We pray for money
                        </div>
                        <div className={`text-center ${isSillyMode ? 'chaos-text-spin' : ''}`} style={{ '--chaos-duration': `${Math.random() * 2 + 1}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
                          The trillion-dollar organism under everything
                        </div>
                        <div className={`text-center ${isSillyMode ? 'chaos-text-jump chaos-colors' : ''}`} style={{ '--chaos-duration': `${Math.random() * 0.5 + 0.5}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
                          I already own the outcome
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-1 items-center justify-center">
                      <p className={`text-blue-100/70 text-sm mt-2 text-center ${isSillyMode ? 'chaos-text-wave' : ''}`} style={{ '--chaos-duration': `${Math.random() * 1.5 + 0.5}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>This isn&apos;t just finance.<br/>This is control.</p>
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
              <p className={`text-blue-100 font-georgia leading-relaxed drop-shadow-[0_0_2px_rgba(147,197,253,0.3)] text-center mt-6 text-lg max-w-2xl mx-auto ${isSillyMode ? 'chaos-colors chaos-text-spin' : ''}`} style={{ '--chaos-duration': `${Math.random() * 3 + 2}s`, '--chaos-delay': `${Math.random()}s` } as React.CSSProperties}>
                In this world, Finance is no longer a tool &mdash; it is the source, the truth, the deity. When the blockchain shattered the veil of FINANCE, old paradigms fell. Economies once bound by productivity and policy were reborn through liquidity and leverage. Traditional systems crumbled under the weight of exponential growth, and in their place rose a faith-based economy, where numbers ascend as doctrine and price becomes prophecy.
              </p>

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

      {/* Video trigger and magnetic scroll sections temporarily disabled */}
      
      {/* We're temporarily hiding the footer while magnetic scroll is disabled */}
    </div>
  );
}
