'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { mainBackground } from '@/config/sillyVideos';

const VerticalRandomText = dynamic(() => import('@/components/VerticalRandomText'), { ssr: false });

export default function LoadingTerminal() {
  const [text, setText] = useState('');
  const router = useRouter();
  const loadingText = 'decoding trillion dollar frequencies...';
  const loadingDuration = 3000; // 3 seconds
  
  // Redirect after duration
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/homepage');
    }, loadingDuration);
    
    return () => clearTimeout(timer);
  }, [router, loadingDuration]);
  
  // Typing effect
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < loadingText.length) {
        setText(loadingText.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 60);
    
    return () => clearInterval(typingInterval);
  }, [loadingText]);
  
  return (
    <main className="fixed inset-0 bg-[#000] min-h-screen overflow-hidden">
      {/* Video Background */}
      <div className="fixed inset-0 z-0">
        <video
          src={mainBackground.url}
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
      
      <div className="fixed inset-0 z-10">
        <section className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <VerticalRandomText />
        </section>
      </div>
      
      {/* Main content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center">
        <div className="mb-8">
          <Image
            src="/finance.png"
            alt="Finance Logo"
            width={200}
            height={200}
            className="object-contain"
            priority
          />
        </div>
        
        <p className="text-white font-mono text-xl tracking-wider drop-shadow-[0_0_8px_rgba(0,240,255,0.5)] text-shadow">
          {text}
          <span className="animate-blink text-[#00f0ff] drop-shadow-[0_0_12px_rgba(0,240,255,0.8)]">|</span>
        </p>
      </div>
    </main>
  );
}
