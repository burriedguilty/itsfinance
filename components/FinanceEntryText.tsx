'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from './FinanceEntryText.module.css';

interface FinanceEntryTextProps {
  delay?: number; // Delay in ms before showing the component
  typingSpeed?: number; // Time in ms per character typing
  toastDuration?: number; // Duration in ms for toast notification
}

export default function FinanceEntryText({
  delay = 2000, // Default 2 seconds delay
  typingSpeed = 100, // Default 100ms per character
  toastDuration = 2000, // Default 2 seconds toast duration
}: FinanceEntryTextProps) {
  const [isVisible, setIsVisible] = useState(false); // Start hidden for intro animation
  const [showContractAddress, setShowContractAddress] = useState(false); // Hide contract address until clicked
  const [typedText, setTypedText] = useState(''); // Start with empty text for typing animation
  const [isTypingComplete, setIsTypingComplete] = useState(false); // Typing starts incomplete
  const [showToast, setShowToast] = useState(false);
  
  const mainText = 'ENTER THE FINANCE FREEDOM';
  const contractAddress = 'FSQ4CBemMh7SBAC6odzCaRCvQZPc5i4QTLTFTSAdpump';
  
  // Handle visibility after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  // Handle typing animation
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
    if (isTypingComplete) {
      setShowContractAddress(true);
    }
  };
  
  const handleContractClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering parent click events
    copyToClipboard(contractAddress);
  };
  
  if (!isVisible) {
    return null;
  }
  
  return (
    <div className={styles.container}>
      <div
        className={`${styles.mainText} ${isTypingComplete ? styles.clickable : ''}`}
        onClick={handleClick}
      >
        {typedText}
        {!isTypingComplete && <span className={styles.cursor}>|</span>}
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
    </div>
  );
}
