'use client';

import { useEffect, useRef, useState } from 'react';
import { getRandomVideo, SillyVideo } from '@/config/sillyVideos';

interface SillyBackgroundProps {
  isActive?: boolean;
  background?: SillyVideo;
  onVideoEnd?: () => void;
}

export default function SillyBackground({ isActive = false, background: initialBackground }: SillyBackgroundProps) {
  const [currentBackground, setCurrentBackground] = useState(() => initialBackground || getRandomVideo());
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioRef2 = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Handle background media
  useEffect(() => {
    if (isActive) {
      // Get a random video when activating silly mode
      const newVideo = getRandomVideo();
      setCurrentBackground(newVideo);

      // Start playing audio
      const audio = audioRef.current;
      const audio2 = audioRef2.current;
      
      if (audio) {
        audio.src = newVideo.audioUrl;
        audio.currentTime = 0;
        audio.volume = 0.5;
        audio.loop = true;
        audio.play().catch(() => {});

        // Get audio duration and setup second audio
        audio.addEventListener('loadedmetadata', () => {
          if (audio2) {
            audio2.src = newVideo.audioUrl;
            audio2.volume = 0.5;
            audio2.loop = true;
            
            // Start second audio at 50% of first audio duration
            setTimeout(() => {
              audio2.play().catch(() => {});
            }, (audio.duration * 1000) / 2);
          }
        });
      }
    } else {
      // Stop all audio when silly mode is off
      const audio = audioRef.current;
      const audio2 = audioRef2.current;
      
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      if (audio2) {
        audio2.pause();
        audio2.currentTime = 0;
      }
    }

    // Setup or stop video based on silly mode
    const video = videoRef.current;
    if (video) {
      if (isActive && currentBackground.type === 'video') {
        video.src = currentBackground.url;
        video.currentTime = 0;
        video.play().catch(() => {});
      } else {
        video.pause();
        video.src = '';
      }
    }

    // Store refs for cleanup
    const cleanupVideo = video;
    const cleanupAudio = audioRef.current;
    const cleanupAudio2 = audioRef2.current;

    // Cleanup on unmount using stored refs
    return () => {
      if (cleanupVideo) {
        cleanupVideo.pause();
        cleanupVideo.src = '';
      }
      if (cleanupAudio) {
        cleanupAudio.pause();
        cleanupAudio.currentTime = 0;
      }
      if (cleanupAudio2) {
        cleanupAudio2.pause();
        cleanupAudio2.currentTime = 0;
      }
    };
  }, [isActive, currentBackground]);

  return (
    <>
      <audio ref={audioRef} className="hidden" />
      <audio ref={audioRef2} className="hidden" />
      
      {/* Current Background */}
      <div className="fixed inset-0 z-10">
        <div className={`absolute inset-0 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
          {currentBackground.type === 'video' ? (
            <video
              ref={videoRef}
              src={currentBackground.url}
              className="w-full h-full object-cover"
              playsInline
              loop
              muted
            />
          ) : (
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${currentBackground.url})` }}
            />
          )}
        </div>
      </div>
    </>
  );
}
