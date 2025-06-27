'use client';

import React, { useState } from 'react';
import PFPMakerContent from '@/components/PFPMakerContent';
import AIImagery from '@/app/aiimagery/page';

interface PFPMakerPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PFPMakerPopup({ isOpen, onClose }: PFPMakerPopupProps) {
  const [showAIImagery, setShowAIImagery] = useState(false);
  
  if (!isOpen) return null;

  const handleDownloadComplete = () => {
    setShowAIImagery(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Content */}
      <div className="relative min-h-screen flex items-start justify-center py-12 px-4">
        <div 
          className="relative bg-gradient-to-br from-[#001830] to-[#000c24] rounded-lg w-full max-w-6xl overflow-y-auto max-h-[85vh]"
          onClick={(e) => e.stopPropagation()}
        >
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
            <div className={`transition-all duration-300 ${showAIImagery ? 'scale-95 opacity-90' : 'scale-100 opacity-100'}`}>
              <PFPMakerContent onDownloadComplete={handleDownloadComplete} />
            </div>
            
            {/* AIImagery Section */}
            {showAIImagery && (
              <div className="mt-8 border-t border-blue-400/30 pt-6 animate-fadeIn">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-blue-100 font-mono text-lg">Want to enhance your PFP?</h2>
                  <button
                    onClick={() => setShowAIImagery(false)}
                    className="text-blue-300 hover:text-blue-100 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </button>
                </div>
                <div className="bg-[#001020] rounded-lg p-6 border border-blue-400/20 shadow-inner shadow-blue-500/10">
                  <AIImagery />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
