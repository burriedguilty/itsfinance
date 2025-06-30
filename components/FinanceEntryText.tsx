'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from './FinanceEntryText.module.css';
import LoadingTerminal from './LoadingTerminal';

interface FinanceEntryTextProps {
  delay?: number; // Delay in ms before showing the component
  typingSpeed?: number; // Time in ms per character typing
  toastDuration?: number; // Duration in ms for toast notification

}

export default function FinanceEntryText({
  delay = 0, // Default 0 seconds delay
  typingSpeed = 50, // Default 50ms per character
  toastDuration = 2000, // Default 2 seconds toast duration

}: FinanceEntryTextProps) {
  const [isVisible, setIsVisible] = useState(false); // Start hidden for intro animation
  const [showContractAddress, setShowContractAddress] = useState(false); // Hide contract address until clicked
  const [typedText, setTypedText] = useState(''); // Start with empty text for typing animation
  const [isTypingComplete, setIsTypingComplete] = useState(false); // Typing starts incomplete
  const [showToast, setShowToast] = useState(false);
  const [showClick, setShowClick] = useState(false); // Control [CLICK] visibility
  const [clickPositions, setClickPositions] = useState<Array<{x: number, y: number}>>([]);
  const [countdown, setCountdown] = useState<number | null>(null); // Countdown timer
  const [showLoadingTerminal, setShowLoadingTerminal] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  
  const mainText = 'THEY DIDN\'T WANT YOU TO FIND THIS';
  const contractAddress = 'FSQ4CBemMh7SBAC6odzCaRCvQZPc5i4QTLTFTSAdpump';
  
  // Handle visibility after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  // Handle typing animation and random [CLICK] effect
  useEffect(() => {
    if (!isVisible) return;
    
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < mainText.length) {
        setTypedText(mainText.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTypingComplete(true);
        
        // Start random [CLICK] effects after typing is complete
        const clickInterval = setInterval(() => {
          // Generate 3 random positions
          const newPositions = Array.from({length: 3}, () => ({
            x: Math.random() * 300 - 150,
            y: Math.random() * 300 - 150
          }));
          setClickPositions(newPositions);
          setShowClick(true);
        }, 150); // Fast interval for spammy effect
        
        return () => clearInterval(clickInterval);
      }
    }, typingSpeed);
    
    return () => clearInterval(typingInterval);
  }, [isVisible, typingSpeed]);
  
  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setShowToast(true);
      
      // Hide toast after duration
      setTimeout(() => {
        setShowToast(false);
      }, toastDuration);
      
      return true;
    } catch (error) {
      console.error('Failed to copy text: ', error);
      return false;
    }
  }, [toastDuration]);
  
  const handleClick = () => {
    setIsClicked(true);
    if (isTypingComplete) {
      setShowContractAddress(true);
      setCountdown(3);
      
      // Set up countdown interval
      const countdownInterval = setInterval(() => {
        setCountdown(prevCount => {
          if (!prevCount || prevCount <= 1) {
            clearInterval(countdownInterval);
            setShowLoadingTerminal(true);
            return 0;
          }
          return prevCount - 1;
        });
      }, 1000);
    }
  };
  
  const handleContractClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering parent click events
    copyToClipboard(contractAddress);
  };
  
  if (!isVisible) {
    return null;
  }
  
  if (showLoadingTerminal) {
    return (
      <div className="fixed inset-0 z-50">
        <LoadingTerminal />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div 
        className={`${styles.textContainer} ${isClicked ? styles.clicked : ''}`}
        onClick={() => setIsClicked(true)}
      >
        <div
          className={`${styles.mainText} ${isTypingComplete ? styles.clickable : ''}`}
          onClick={handleClick}
        >
          {typedText}
          {!isTypingComplete && <span className={styles.cursor}>|</span>}
        </div>
        {isTypingComplete && showClick && (
          <>
            {clickPositions.map((pos, index) => (
              <span 
                key={index}
                className={styles.clickEffect}
                style={{
                  transform: `translate(${pos.x}px, ${pos.y}px)`
                }}
              >
                [CLICK]
              </span>
            ))}
          </>
        )}
      </div>
      
      {showContractAddress && (
        <div 
          className={styles.contractAddress} 
          onClick={handleContractClick}
        >
          {contractAddress}
        </div>
      )}
      
      {showToast && (
        <div className={styles.toast}>
          <span>Contract address copied to clipboard!</span>
        </div>
      )}
      
      {countdown !== null && (
        <div className={`${styles.countdown} font-georgia normal-case`}>deploying capital . . .</div>
      )}
    </div>
  );
}
