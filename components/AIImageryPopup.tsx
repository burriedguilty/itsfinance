'use client';

import React from 'react';
import AIImagery from '@/app/aiimagery/page';

interface AIImageryPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIImageryPopup: React.FC<AIImageryPopupProps> = ({ isOpen, onClose }) => {
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
          className="relative w-full max-w-6xl bg-[#000814] rounded-lg shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute -top-4 -right-4 w-8 h-8 bg-[#001428] border border-blue-400/50 text-blue-300 hover:text-blue-100 rounded-full z-10 flex items-center justify-center shadow-lg transition-all duration-300 hover:border-blue-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* AIImagery content */}
          <div className="max-h-[90vh] overflow-y-auto">
            <AIImagery />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIImageryPopup;
