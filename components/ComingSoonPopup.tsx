'use client';

import React from 'react';

interface ComingSoonPopupProps {
  isOpen: boolean;
  onClose: () => void;
  feature: string;
}

export default function ComingSoonPopup({ isOpen, onClose, feature }: ComingSoonPopupProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div 
          className="relative w-full max-w-md bg-[#000814] border border-blue-400/30 rounded-lg shadow-xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-blue-300 hover:text-blue-100 z-10"
            onClick={onClose}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Content */}
          <div className="p-8 text-center">
            <h2 className="text-2xl font-georgia text-blue-300 mb-4">{feature}</h2>
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 relative">
                <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <p className="text-blue-100 font-georgia text-lg">Coming Soon</p>
              <p className="text-blue-300/70 text-sm max-w-xs mx-auto mt-2">
                This feature is currently in development. Check back soon for updates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
