'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import styles from './VerticalRandomText.module.css';
import { useIsLowPerfDevice } from '../hooks/useIsLowPerfDevice';

const FINANCE_PHRASES = [
  "WEALTH IS HEALTH",
  "BUY LOW HOLD STRONG",
  "HODL FOREVER",
  "TO THE MOON",
  "DIAMOND HANDS ONLY",
  "STAKE IT ALL",
  "STAY BULLISH",
  "BULL MARKET ENERGY",
  "BUILD THROUGH BEAR",
  "DUE DILIGENCE DAILY",
  "MARKET CAP GROWS",
  "YIELD FARM PEACEFULLY",
  "WAGMI",
  "IN DIP WE TRUST",
  "TIME IN MARKET WINS",
  "FORTUNE FAVORS THE BOLD",
  "COMPOUND THE FAITH",
  "PATIENCE IS WEALTH",
  "FOCUS ON VALUE",
  "ENERGY FLOWS TO VALUE",
  "BELIEVE AND BUILD",
  "HOLD UNTIL GREATNESS",
  "CONSISTENCY IS KING",
  "LONG TERM IS LEGEND",
  "GENERATIONAL WEALTH",
  "VALUE CREATES FREEDOM",
  "WISDOM YIELDS PROFIT",
  "SLOW IS FAST",
  "MINDSET = MONEY",
  "PEACEFUL PROFITS"
];

type TextPosition = 'left' | 'right';

interface TextAnimation {
  id: number;
  text: string;
  position: TextPosition;
  top: number;
  left: number;
  typingIndex: number;
  falling: boolean;
  fallSpeed: number;
  fallDistance: number;
  fadingOut: boolean;
  fadeOutStarted: number | null;
  startTime: number;
}

export default function VerticalRandomText() {
  const isLowPerf = useIsLowPerfDevice();
  const [animations, setAnimations] = useState<TextAnimation[]>([]);
  const animationRef = useRef<number | null>(null);
  const lastFrame = useRef<number>(performance.now());
  const activeRef = useRef<TextAnimation[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  // Adjust parameters based on device type
  const MAX = isLowPerf || isMobile ? 6 : 12;
  // Removed unused MIN constant
  const INTERVAL = isLowPerf || isMobile ? 700 : 400;

  const create = useCallback((forcedSide?: TextPosition): TextAnimation | null => {
    for (let attempt = 0; attempt < 6; attempt++) {
      const position: TextPosition = forcedSide || (Math.random() > 0.5 ? 'left' : 'right');
      // Adjust positioning for mobile screens
      const left = position === 'left' 
        ? Math.random() * 20 + 2 // Less space from left edge on mobile
        : Math.random() * 20 + (window.innerWidth < 768 ? 78 : 70); // Closer to right edge on mobile
      const top = Math.random() * 30;

      const tooClose = activeRef.current.some(a =>
        Math.abs(a.left - left) < 10 && Math.abs(a.top - top) < 8
      );
      if (tooClose) continue;

      const now = Date.now();
      return {
        id: now + Math.floor(Math.random() * 100000),
        text: FINANCE_PHRASES[Math.floor(Math.random() * FINANCE_PHRASES.length)],
        position,
        top,
        left,
        typingIndex: 0,
        falling: false,
        fallSpeed: Math.random() * 2 + 0.4,
        fallDistance: Math.random() * 30 + 20,
        fadingOut: false,
        fadeOutStarted: null,
        startTime: now + Math.random() * 1000
      };
    }
    return null;
  }, []);

  const animate = useCallback((time: number) => {
    const delta = time - lastFrame.current;
    lastFrame.current = time;
    const now = Date.now();

    setAnimations(prev => {
      const next = prev.map(anim => {
        const age = now - anim.startTime;
        if (age < 0) return anim;

        // Faster typing effect with slightly higher probability
        const shouldType = anim.typingIndex < anim.text.length && Math.random() > 0.5 - delta / 1000;
        const nextTyping = shouldType ? anim.typingIndex + 1 : anim.typingIndex;

        const startFall = !anim.falling && (
          nextTyping >= anim.text.length * 0.7 || age > 2500
        ) && Math.random() > 0.97;

        const newTop = anim.falling
          ? anim.top + (anim.fallSpeed * delta / 100)
          : anim.top;

        const shouldFade = !anim.fadingOut && anim.falling && (
          newTop - anim.top > anim.fallDistance * 0.4 || age > 5000
        );

        return {
          ...anim,
          typingIndex: nextTyping,
          falling: anim.falling || startFall,
          top: newTop,
          fadingOut: anim.fadingOut || shouldFade,
          fadeOutStarted: shouldFade && !anim.fadeOutStarted ? now : anim.fadeOutStarted
        };
      });

      const filtered = next.filter(anim => {
        if (anim.fadeOutStarted && now - anim.fadeOutStarted > 1000) return false;
        if (anim.top > 100) return false;
        return true;
      });

      activeRef.current = filtered;
      return filtered;
    });

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    // Check if device is mobile on mount
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    const initial: TextAnimation[] = [];
    // Reduce number of initial animations on mobile
    const initialCount = isMobile ? 2 : 4;
    for (let i = 0; i < initialCount; i++) {
      const a = create(i % 2 === 0 ? 'left' : 'right');
      if (a) initial.push(a);
    }
    setAnimations(initial);
    activeRef.current = initial;
    animationRef.current = requestAnimationFrame(animate);

    const spawnLoop = setInterval(() => {
      setAnimations(prev => {
        const active = prev.filter(a => !a.fadingOut);
        if (active.length >= MAX) return prev;

        const left = active.filter(a => a.position === 'left').length;
        const right = active.filter(a => a.position === 'right').length;
        const pos: TextPosition = left <= right ? 'left' : 'right';

        const a = create(pos);
        return a ? [...prev, a] : prev;
      });
    }, INTERVAL);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      clearInterval(spawnLoop);
      window.removeEventListener('resize', checkMobile);
    };
  }, [animate, create, MAX, INTERVAL, isMobile]); // Added missing dependencies

  return (
    <>
      {animations.map(anim => (
        <div
          key={anim.id}
          className={`${styles.verticalTextColumn} ${anim.falling ? styles.falling : ''} ${anim.fadingOut ? styles.fadingOut : ''}`}
          style={{ top: `${anim.top}%`, left: `${anim.left}%` }}
        >
          {anim.text.split('').map((c, i) => (
            <span
              key={i}
              className={`${styles.verticalChar} ${i < anim.typingIndex ? styles.visible : styles.hidden}`}
              style={{ animationDelay: `${i * 30}ms` }}
            >
              {c}
            </span>
          ))}
        </div>
      ))}
    </>
  );
}
