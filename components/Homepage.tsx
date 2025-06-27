'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import GlitchHeading from './GlitchHeading';
import '@/styles/metallic.css';
import '@/styles/video-container.css';
import '@/styles/button-glow.css';
import '@/styles/marquee.css';
import '@/styles/glitch.css';
import '@/styles/status-effects.css';
import '@/styles/heading-glitch.css';
const VerticalRandomText = dynamic(() => import('@/components/VerticalRandomText'), { ssr: false });
const GlitchMarquee = dynamic(() => import('@/components/GlitchMarquee'), { ssr: false });

// Import components with dynamic loading
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });
const DitheredBg = dynamic(() => import('@/components/DitheredBg'), { ssr: false });
const PFPMakerPopup = dynamic(() => import('@/components/PFPMakerPopup'), { ssr: false });


export default function Homepage() {
  const [isPFPMakerOpen, setIsPFPMakerOpen] = useState(false);

  return (
    <div className="bg-background min-h-screen overflow-x-hidden relative">
      {/* Background layers */}
      <div className="fixed inset-0 z-0">
        <DitheredBg primaryColor="#001122" secondaryColor="#000814" patternSize={4} />
      </div>
      <section className="fixed inset-0 pointer-events-none z-10">
        <VerticalRandomText />
      </section>
      
      {/* Header */}
      <header className="sticky top-0 z-30 w-full bg-black/70 backdrop-blur-sm border-b border-secondary/30">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src="/finance1.svg"
              alt="Finance Logo"
              width={48}
              height={48}
            />
          </div>
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setIsPFPMakerOpen(true)}
              className="px-4 py-2 bg-[#001428] border border-blue-400/50 text-blue-300 hover:border-blue-300 hover:text-blue-100 rounded font-mono tracking-wider transition-all text-sm shadow-sm shadow-blue-500/20 button-glow"
            >
              Create PFP
            </button>
          </div>
        </div>
      </header>

      {/* PFP Maker Popup */}
      <PFPMakerPopup
        isOpen={isPFPMakerOpen}
        onClose={() => setIsPFPMakerOpen(false)}
      />

      {/* Main content */}
      <main className="container mx-auto px-4 py-8 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left sidebar */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-[#001830] to-[#000c24] border border-blue-400/30 rounded-lg p-4 hover:border-blue-300/50 transition-all duration-500 shadow-lg shadow-blue-500/20">
              <div className="relative h-[24px] mb-4 flex justify-center">
                <GlitchHeading 
                  text="THE SYSTEM BOWS TO FINANCE"
                  className="text-xl text-blue-100 font-mono tracking-widest drop-shadow-[0_0_3px_rgba(147,197,253,0.5)] font-bold uppercase text-center"
                />
              </div>
              <div className="text-blue-100 font-mono text-sm space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-blue-100/70 line-through">Elections?</span>
                  <span className="text-blue-100/30 tracking-[.25em] text-center px-2 flex-1">.......</span>
                  <span className="font-medium text-blue-100 animate-pulse drop-shadow-[0_0_8px_rgba(147,197,253,0.8)]">financed.</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-blue-100/70 line-through">Wars?</span>
                  <span className="text-blue-100/30 tracking-[.25em] text-center px-2 flex-1">.......</span>
                  <span className="font-medium text-blue-100 animate-pulse drop-shadow-[0_0_8px_rgba(147,197,253,0.8)]">financed.</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-blue-100/70 line-through">Religions?</span>
                  <span className="text-blue-100/30 tracking-[.25em] text-center px-2 flex-1">.......</span>
                  <span className="font-medium text-blue-100 animate-pulse drop-shadow-[0_0_8px_rgba(147,197,253,0.8)]">financed.</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-blue-100/70 line-through">The house you&apos;re in?</span>
                  <span className="text-blue-100/30 tracking-[.25em] text-center px-2 flex-1">.......</span>
                  <span className="font-medium text-blue-100 animate-pulse drop-shadow-[0_0_8px_rgba(147,197,253,0.8)]">financed.</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#001830] to-[#000c24] border border-blue-400/30 rounded-lg p-4 hover:border-blue-300/50 transition-all duration-500 shadow-lg shadow-blue-500/20">
              <div className="flex justify-center mb-4">
                <GlitchHeading 
                  text="MY REALITY IS PRICED IN"
                  className="text-lg text-blue-100 font-mono tracking-widest drop-shadow-[0_0_3px_rgba(147,197,253,0.5)] font-bold uppercase text-center"
                />
              </div>
              <div className="text-blue-100 font-mono leading-relaxed drop-shadow-[0_0_2px_rgba(147,197,253,0.3)] space-y-3 text-sm text-center max-w-sm mx-auto">
                <p>Let&apos;s create something amazing together!</p>
                <div>That&apos;s how Finance works</div>
                <div>My timeline is denominated</div>
                <div>My thoughts are fractionalized</div>
                <div>Everything inflates</div>
                <div>It&apos;s a ritual</div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#001830] to-[#000c24] border border-blue-400/30 rounded-lg p-4 hover:border-blue-300/50 transition-all duration-500 shadow-lg shadow-blue-500/20">
              <div className="flex justify-center mb-4">
                <GlitchHeading 
                  text="FINANCE IS AROUND THE CLOCK"
                  className="text-lg text-blue-100 font-mono tracking-widest drop-shadow-[0_0_3px_rgba(147,197,253,0.5)] font-bold uppercase text-center"
                />
              </div>
              <div className="text-blue-100 font-mono leading-relaxed drop-shadow-[0_0_2px_rgba(147,197,253,0.3)] space-y-3 text-sm text-center max-w-sm mx-auto">
                <div>24/7 isn&apos;t a grind</div>
                <p>Here&apos;s what you can do:</p>
                <p>Welcome to Finance&apos;s AI-powered image generation tool! This tool helps you create stunning images in minutes.</p>
                <div>Let&apos;s make your profile picture unique!</div>
                <div>Finance never stops because power doesn&apos;t sleep</div>
              </div>
            </div>
          </div>
          
          {/* Main feature */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-[#001830] to-[#000c24] border border-blue-400/30 rounded-lg p-6 hover:border-blue-300/50 transition-all duration-500 shadow-lg shadow-blue-500/20">
              <div className="flex justify-between items-center mb-8">
                <GlitchHeading
                  text="WELCOME TO THE FINANCIAL WORLD ORDER"
                  className="text-xl md:text-3xl text-blue-100 font-mono tracking-widest drop-shadow-[0_0_3px_rgba(147,197,253,0.5)] mb-8 font-bold uppercase"
                />
                <span className="status-text live text-sm">LIVE UPDATES</span>
              </div>
              <div className="relative flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/2">
                  <div className="flex flex-col">
                    <div className="flex flex-col items-center gap-4 text-blue-100 font-mono text-lg tracking-wide">
                      <div className="flex flex-col items-center gap-3 w-full max-w-sm mx-auto">
                        <div className="text-center">
                          Finance is the religion
                        </div>
                        <div className="text-center">
                          We pray for money
                        </div>
                        <div className="text-center">
                          The trillion-dollar organism under everything
                        </div>
                        <div className="text-center">
                          The charts were a distraction
                        </div>
                        <div className="text-center">
                          I already own the outcome
                        </div>
                      </div>
                    </div>
                    <p className="text-blue-100 font-mono text-sm tracking-wide text-center mt-32">
                      This isn&apos;t just finance.<br/>
                      This is control.
                    </p>
                  </div>
                </div>
                <div className="w-full md:w-1/2 bg-[#001020] rounded-lg overflow-hidden border border-blue-400/20 flex items-center justify-center p-4 shadow-inner shadow-blue-500/10">
                  <video 
                    src="/vid1.mp4" 
                    className="w-full h-auto filter drop-shadow-[0_0_8px_rgba(96,165,250,0.2)]" 
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
        <div className="mt-8 bg-gradient-to-br from-[#001830] to-[#000c24] border border-blue-400/30 rounded-lg p-6 hover:border-blue-300/50 transition-all duration-500 shadow-lg shadow-blue-500/20 relative overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <GlitchHeading 
              text="IT&apos;S JUST FINANCE"
              as="h2"
              className="text-2xl text-blue-100 font-mono tracking-wider drop-shadow-[0_0_3px_rgba(147,197,253,0.5)] uppercase"
            />
            <span className="status-text recording text-sm">FINANCE RUNS EVERYTHING</span>
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2 bg-[#001020] rounded-lg overflow-hidden border border-blue-400/20 flex items-center justify-center p-4 shadow-inner shadow-blue-500/10">
              <video 
                src="/vid2.mp4" 
                className="w-auto h-auto" 
                autoPlay 
                loop 
                muted 
                playsInline
              />
            </div>
            <div className="w-full md:w-1/2 flex flex-col items-center">
              <Image
                src="/finance1.svg"
                alt="Finance Logo"
                width={384}
                height={384}
              />
              <p className="text-blue-100 font-mono leading-relaxed drop-shadow-[0_0_2px_rgba(147,197,253,0.3)] text-center mt-6 text-lg max-w-2xl mx-auto">
                In this world, Finance is no longer a tool &mdash; it is the source, the truth, the deity. When the blockchain shattered the veil of FINANCE, old paradigms fell. Economies once bound by productivity and policy were reborn through liquidity and leverage. Traditional systems crumbled under the weight of exponential growth, and in their place rose a faith-based economy, where numbers ascend as doctrine and price becomes prophecy.
              </p>
              <div className="mt-auto pt-8 flex flex-wrap gap-3 justify-center">
                <a 
                  href="https://x.com/FinanceCoinSOL" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="px-5 py-2 bg-[#001428] border border-blue-400/50 text-blue-300 hover:border-blue-300 hover:text-blue-100 transition-all duration-300 rounded-md font-mono tracking-wider shadow-sm shadow-blue-500/20 button-glow"
                >
                  X
                </a>
                <a 
                  href="https://x.com/i/communities/1936427386675089602" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="px-5 py-2 bg-[#001428] border border-blue-400/30 text-blue-400 hover:border-blue-300 hover:text-blue-100 transition-all duration-300 rounded-md font-mono tracking-wider shadow-sm shadow-blue-500/20"
                >
                  X COMMUNITY
                </a>
                <a 
                  href="https://dexscreener.com/solana/9axdtk6m17kqnxemavqyocjmu57rsf6w9wgzbsdssg3u" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="px-5 py-2 bg-[#001428] border border-blue-400/30 text-blue-400 hover:border-blue-300 hover:text-blue-100 transition-all duration-300 rounded-md font-mono tracking-wider shadow-sm shadow-blue-500/20"
                >
                  CHART
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <div className="mt-12 w-full">
        <Footer />
      </div>
    </div>
  );
}
