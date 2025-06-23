import { useState, useEffect } from 'react';

/**
 * Hook to detect if the current device is likely a low performance device
 * This uses a combination of hardware concurrency and memory detection
 */
export function useIsLowPerfDevice() {
  const [isLowPerf, setIsLowPerf] = useState(false);

  useEffect(() => {
    // Check for device characteristics that indicate lower performance
    const checkPerformance = () => {
      // Hardware concurrency gives us an idea of CPU cores
      const lowConcurrency = 
        typeof navigator !== 'undefined' && 
        navigator.hardwareConcurrency && 
        navigator.hardwareConcurrency <= 4;

      // deviceMemory is in GB, not available in all browsers
      const lowMemory = 
        // @ts-ignore: deviceMemory is not in the standard TS types yet
        typeof navigator !== 'undefined' && navigator.deviceMemory && 
        // @ts-ignore
        navigator.deviceMemory <= 4;

      // Mobile detection as a fallback
      const isMobile = 
        typeof navigator !== 'undefined' && 
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );

      // Consider low performance if any criteria are met
      setIsLowPerf(lowConcurrency || lowMemory || isMobile);
    };

    checkPerformance();

    // Also check if we're running with reduced motion preference
    const prefersReducedMotion = 
      typeof window !== 'undefined' && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      setIsLowPerf(true);
    }
  }, []);

  return isLowPerf;
}
