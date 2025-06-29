'use client';

import { useEffect, useRef, useState } from 'react';
import { getRandomVideo } from '@/config/sillyVideos';

interface SillyBackgroundProps {
  isActive: boolean;
  onVideoEnd?: () => void;
}

export default function SillyBackground({ isActive }: SillyBackgroundProps) {
  const [background] = useState(() => getRandomVideo());
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioRef2 = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Handle background media
  useEffect(() => {
    if (!isActive) return;

    const audio = audioRef.current;
    const audio2 = audioRef2.current;
    const video = videoRef.current;

    // Setup first audio
    if (audio) {
      audio.src = background.audioUrl;
      audio.currentTime = 0;
      audio.volume = 0.5;
      audio.loop = true;
      audio.play().catch(() => {});

      // Get audio duration and setup second audio
      audio.addEventListener('loadedmetadata', () => {
        if (audio2) {
          audio2.src = background.audioUrl;
          audio2.volume = 0.5;
          audio2.loop = true;
          
          // Start second audio at 50% of first audio duration
          setTimeout(() => {
            audio2.play().catch(() => {});
          }, (audio.duration * 1000) / 2);
        }
      });
    }

    // Setup video if video type
    if (video && background.type === 'video') {
      video.src = background.url;
      video.currentTime = 0;
      video.play().catch(() => {});
    }

    // Cleanup
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      if (audio2) {
        audio2.pause();
        audio2.currentTime = 0;
      }
      if (video) {
        video.pause();
        video.src = '';
      }
    };
  }, [isActive, background]);

  return (
    <>
      <audio ref={audioRef} className="hidden" />
      <audio ref={audioRef2} className="hidden" />
      
      {/* Current Background */}
      <div className="fixed inset-0 z-10">
        <div className={`absolute inset-0 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
          {background.type === 'video' ? (
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              playsInline
              loop
              muted
            />
          ) : (
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${background.url})` }}
            />
          )}
        </div>
      </div>
    </>
  );
}
