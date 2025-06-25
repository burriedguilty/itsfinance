'use client';

import { useEffect, useState, memo } from 'react';

const GLITCH_CHARS = {
  'A': ['4', '∆', '@', 'Λ'],
  'B': ['8', '฿', 'β', '๖'],
  'C': ['¢', '©', '₵', 'Ç'],
  'D': ['Ð', 'Þ', 'Ð', 'ᗪ'],
  'E': ['3', '€', 'Σ', 'ξ'],
  'F': ['₣', 'Ƒ', 'ғ', 'Ϝ'],
  'G': ['6', '₲', 'Ğ', 'ģ'],
  'H': ['#', 'Ħ', 'н', 'Ң'],
  'I': ['1', '|', '!', 'ı'],
  'J': ['ʝ', 'נ', 'ਹ', 'Ĵ'],
  'K': ['₭', 'К', 'к', 'ҡ'],
  'L': ['£', '⅃', 'ℓ', 'Ł'],
  'M': ['₥', 'М', 'м', 'Ӎ'],
  'N': ['И', 'ה', 'Π', 'Ň'],
  'O': ['0', 'Ø', 'σ', 'Ѳ'],
  'P': ['₱', 'Р', 'р', 'Ҏ'],
  'Q': ['Q', 'Ҩ', 'զ', 'Ԛ'],
  'R': ['Я', 'Ɽ', 'я', 'Ŗ'],
  'S': ['$', '§', 'Ş', 'Ϟ'],
  'T': ['₮', 'Ŧ', 'т', 'Ҭ'],
  'U': ['μ', 'Ц', 'υ', 'Ữ'],
  'V': ['\\/', 'V', 'ν', 'Ѵ'],
  'W': ['₩', 'Ш', 'ω', 'Ŵ'],
  'X': ['×', 'Ж', 'χ', 'Ӿ'],
  'Y': ['¥', 'Ұ', 'γ', 'Ў'],
  'Z': ['2', 'Ƶ', 'ζ', 'Ž'],
  ' ': ['_', '.', '-', '+'],
  '$': ['₿', '¢', '₽', '€']
};

const GlitchChar = memo(({ char }: { char: string }) => {
  const [displayChar, setDisplayChar] = useState(char);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.02 && !isGlitching) { // 2% chance per character
        setIsGlitching(true);
        
        const iterations = Math.floor(Math.random() * 3) + 1;
        let currentIteration = 0;
        
        const glitchSequence = () => {
          const upperChar = char.toUpperCase();
          const glitchChars = GLITCH_CHARS[upperChar as keyof typeof GLITCH_CHARS];
          
          if (glitchChars) {
            const randomChar = glitchChars[Math.floor(Math.random() * glitchChars.length)];
            setDisplayChar(randomChar);
          }
          
          currentIteration++;
          
          if (currentIteration < iterations) {
            setTimeout(glitchSequence, 50 + Math.random() * 100);
          } else {
            setTimeout(() => {
              setDisplayChar(char);
              setIsGlitching(false);
            }, 50);
          }
        };
        
        glitchSequence();
      }
    }, 100); // Check more frequently per character

    return () => clearInterval(glitchInterval);
  }, [char, isGlitching]);

  return (
    <span className={isGlitching ? 'char-glitch' : ''}>
      {displayChar}
    </span>
  );
});

GlitchChar.displayName = 'GlitchChar';

const GlitchHeading = memo(({ 
  text, 
  as: Component = 'h3',
  className = ''
}: { 
  text: string;
  as?: 'h2' | 'h3';
  className?: string;
}) => {
  return (
    <Component className={className}>
      {text.split('').map((char, index) => (
        <GlitchChar key={`${index}-${char}`} char={char} />
      ))}
    </Component>
  );
});

GlitchHeading.displayName = 'GlitchHeading';

export default GlitchHeading;
