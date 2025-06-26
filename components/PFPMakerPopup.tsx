'use client';

import React from 'react';
import PFPMaker from '@/app/pfpmaker/page';

interface PFPMakerPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PFPMakerPopup({ isOpen, onClose }: PFPMakerPopupProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Content */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-gradient-to-br from-[#001830] to-[#000c24] rounded-lg w-full max-w-6xl">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-blue-300 hover:text-blue-100 z-10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="p-6">
            <PFPMaker />
          </div>
        </div>
      </div>
    </div>
  );
}
