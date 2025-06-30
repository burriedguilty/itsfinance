'use client';

import { useApp } from '@/context/AppContext';
import '@/styles/magnetic-scroll.css';
import { useEffect, useRef, useState } from 'react';

const VIDEOS = [
  {
    id: 1,
    src: '/videos/vid1.mp4',
  },
  {
    id: 2,
    src: '/videos/vid2.mp4',
  },
  {
    id: 3,
    src: '/videos/vid3.mp4',
  },
];

export default function MagneticVideoScroll() {
  const { isSillyMode } = useApp();
  const [, setActiveSection] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const triggerElement = document.getElementById('video-trigger');
      
      if (triggerElement) {
        const triggerPosition = triggerElement.getBoundingClientRect().top + window.scrollY;
        if (scrollPosition >= triggerPosition - (windowHeight / 2)) {
          setIsVisible(true);
          // Snap to video section
          if (!containerRef.current?.contains(document.activeElement)) {
            containerRef.current?.scrollIntoView({ behavior: 'smooth' });
          }
        } else {
          setIsVisible(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionIndex = sectionRefs.current.findIndex(
              (ref) => ref === entry.target
            );
            if (sectionIndex !== -1) {
              setActiveSection(sectionIndex);
            }
          }
        });
      },
      {
        root: container,
        threshold: 0.5,
      }
    );

    sectionRefs.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`magnetic-scroll-container ${isSillyMode ? 'chaos-mode' : ''} ${isVisible ? 'visible' : 'invisible pointer-events-none'}`}
    >
      {VIDEOS.map((video, index) => (
        <div
          key={video.id}
          ref={(el: HTMLDivElement | null) => {
            sectionRefs.current[index] = el;
          }}
          className={`magnetic-scroll-section ${isSillyMode ? 'chaos-shake-hard' : ''}`}
          style={{ 
            '--chaos-duration': `${Math.random() * 0.5 + 0.3}s`,
            '--chaos-delay': `${Math.random()}s`
          } as React.CSSProperties}
        >
          <div className="magnetic-content">
            <video
              src={video.src}
              className={`magnetic-video ${isSillyMode ? 'chaos-colors' : ''}`}
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>
      ))}
    </div>
  );
}
