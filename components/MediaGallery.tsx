'use client';

import { useState, useRef, useEffect, TouchEvent } from 'react';
import Image from 'next/image';

type MediaItem = {
  url: string;
};

type MediaGalleryProps = {
  onClose: () => void;
};

// Helper function to determine media type from URL
const getMediaType = (url: string): 'image' | 'video' => {
  const extension = url.split('.').pop()?.toLowerCase() || '';
  const videoExtensions = ['mp4', 'webm', 'ogg', 'mov', 'avi', 'wmv', 'flv', 'm4v'];
  return videoExtensions.includes(extension) ? 'video' : 'image';
};

// Helper function to optimize Cloudinary URLs
const optimizeCloudinaryUrl = (url: string, type: 'image' | 'video'): string => {
  if (!url.includes('cloudinary.com')) return url; // Not a Cloudinary URL
  
  try {
    // Parse the URL to identify parts
    const urlParts = url.split('/');
    const uploadIndex = urlParts.findIndex(part => part === 'upload');
    
    if (uploadIndex === -1) return url; // Not a standard Cloudinary URL
    
    // Insert transformation parameters after 'upload'
    if (type === 'image') {
      // For images: resize to fit within 800x600, auto format, and quality 80%
      urlParts.splice(uploadIndex + 1, 0, 'c_fit,w_800,h_600,q_80,f_auto');
    } else {
      // For videos: resize to 720p, auto format, and quality auto
      urlParts.splice(uploadIndex + 1, 0, 'c_fit,w_1280,h_720,q_auto');
    }
    
    return urlParts.join('/');
  } catch (error) {
    console.error('Error optimizing Cloudinary URL:', error);
    return url; // Return original URL if there's an error
  }
};

export default function MediaGallery({ onClose }: MediaGalleryProps) {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const minSwipeDistance = 50; // Minimum distance in pixels to trigger a swipe
  
  // Cloudinary media URLs
  const mediaItems: MediaItem[] = [
    { url: 'https://res.cloudinary.com/dfjqqnv3x/video/upload/v1751374268/IMG_6515-moshed-06-30-17-22-32-990.mp4' },
    { url: 'https://res.cloudinary.com/dfjqqnv3x/video/upload/v1751374272/FINANCE_SCHIZ-001.mov' },
    { url: 'https://res.cloudinary.com/dfjqqnv3x/video/upload/v1751374279/FINANCE_SCHIZ-002.mov' },
  ];
  
  const goToNext = () => {
    setCurrentMediaIndex((prev) => (prev + 1) % mediaItems.length);
  };
  
  const goToPrevious = () => {
    setCurrentMediaIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
  };
  
  // Touch event handlers for swipe functionality
  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  
  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  
  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchEndX.current - touchStartX.current;
    const isSignificantSwipe = Math.abs(distance) > minSwipeDistance;
    
    if (isSignificantSwipe) {
      if (distance > 0) {
        // Swipe right - go to previous
        goToPrevious();
      } else {
        // Swipe left - go to next
        goToNext();
      }
    }
    
    // Reset values
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="relative w-full max-w-4xl bg-[#000a18] border border-blue-400/30 rounded-lg overflow-hidden">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-blue-300 hover:text-blue-100 z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        {/* Gallery content */}
        <div className="p-8 flex flex-col items-center">
          <h2 className="text-2xl text-blue-300 font-georgia mb-6">MEME Gallery</h2>
          <div 
            className="w-full flex items-center justify-center border border-blue-400/30 rounded-lg overflow-hidden bg-black/50"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {mediaItems.length > 0 ? (
              getMediaType(mediaItems[currentMediaIndex].url) === 'video' ? (
                <div className="w-full">
                  <video 
                    src={optimizeCloudinaryUrl(
                      mediaItems[currentMediaIndex].url, 
                      'video'
                    )} 
                    className="w-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    disablePictureInPicture
                    disableRemotePlayback
                  />
                </div>
              ) : (
                <div className="w-full">
                  <Image 
                    src={optimizeCloudinaryUrl(
                      mediaItems[currentMediaIndex].url, 
                      'image'
                    )}
                    alt={`Gallery item ${currentMediaIndex + 1}`}
                    className="w-full object-cover"
                    width={800}
                    height={600}
                    unoptimized={false}
                  />
                </div>
              )
            ) : (
              <p className="text-blue-100 font-georgia">No media items available</p>
            )}
          </div>
          <div className="mt-6 flex justify-between w-full items-center">
            <button 
              onClick={goToPrevious}
              className="px-4 py-2 bg-[#001428] border border-blue-400/30 text-blue-300 hover:border-blue-300 hover:text-blue-100 rounded-md font-georgia transition-all duration-300"
            >
              Previous
            </button>
            <span className="text-blue-300 font-georgia">
              {mediaItems.length > 0 ? `${currentMediaIndex + 1} / ${mediaItems.length}` : '0 / 0'}
            </span>
            <button 
              onClick={goToNext}
              className="px-4 py-2 bg-[#001428] border border-blue-400/30 text-blue-300 hover:border-blue-300 hover:text-blue-100 rounded-md font-georgia transition-all duration-300"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
