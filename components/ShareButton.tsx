'use client';

import React from 'react';

interface ShareButtonProps {
  className?: string;
}

export default function ShareButton({ className = '' }: ShareButtonProps) {
  const handleShare = () => {
    const text = encodeURIComponent('Just got my Finance PFP! 🔥\n\nFSQ4CBemMh7SBAC6odzCaRCvQZPc5i4QTLTFTSAdpump');
    const twitterUrl = `https://twitter.com/intent/tweet?text=${text}`;
    window.open(twitterUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleShare}
      className={`flex items-center gap-2 text-blue-300 hover:text-blue-100 transition-all duration-300 font-mono tracking-wider text-sm ${className}`}
    >
      <svg 
        viewBox="0 0 24 24" 
        width="16" 
        height="16" 
        fill="currentColor"
        className="relative top-[-1px]"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
      Share
    </button>
  );
}
