'use client';

import { memo } from 'react';

const TEXT_VARIANTS = [
  '富は健康 • WEALTH IS HEALTH • 富は健康',
  'WEALTH IS HEALTH • 富は健康 • WEALTH IS HEALTH',
  '富は健康 • 富は健康 • 富は健康'
];

const GlitchText = memo(({ text }: { text: string }) => (
  <div 
    className="marquee-text text-2xl glitch-text" 
    data-text={text}
  >
    {text}
  </div>
));

GlitchText.displayName = 'GlitchText';

export default function GlitchMarquee() {
  return (
    <div className="marquee-container h-full flex items-center overflow-hidden">
      <div className="marquee-wrapper">
        {TEXT_VARIANTS.map((text, index) => (
          <GlitchText key={index} text={text} />
        ))}
        {/* Duplicate for seamless loop */}
        {TEXT_VARIANTS.map((text, index) => (
          <GlitchText key={`dup-${index}`} text={text} />
        ))}
      </div>
    </div>
  );
}
