'use client';

import { useEffect, useRef } from 'react';

interface DitheredBgProps {
  primaryColor?: string;
  secondaryColor?: string;
  patternSize?: number;
  className?: string;
}

export default function DitheredBg({
  primaryColor = '#001122',
  secondaryColor = '#00284d',
  patternSize = 6,
  className = '',
}: DitheredBgProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions to match window size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawDitheredPattern();
    };

    // Create dithered pattern
    const drawDitheredPattern = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background with primary color
      ctx.fillStyle = primaryColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Create dithered pattern with secondary color
      ctx.fillStyle = secondaryColor;

      // Bayer 8x8 dithering matrix for more detail
      const bayerMatrix8x8 = [
        [0, 32, 8, 40, 2, 34, 10, 42],
        [48, 16, 56, 24, 50, 18, 58, 26],
        [12, 44, 4, 36, 14, 46, 6, 38],
        [60, 28, 52, 20, 62, 30, 54, 22],
        [3, 35, 11, 43, 1, 33, 9, 41],
        [51, 19, 59, 27, 49, 17, 57, 25],
        [15, 47, 7, 39, 13, 45, 5, 37],
        [63, 31, 55, 23, 61, 29, 53, 21]
      ];

      // Draw the dithered pattern
      for (let y = 0; y < canvas.height; y += patternSize) {
        for (let x = 0; x < canvas.width; x += patternSize) {
          // Get position in the 8x8 matrix
          const matrixX = Math.floor(x / patternSize) % 8;
          const matrixY = Math.floor(y / patternSize) % 8;
          
          // Calculate distance from center for radial effect
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          const dx = x - centerX;
          const dy = y - centerY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
          const distanceFactor = distance / maxDistance;
          
          // Threshold based on distance and matrix value
          const threshold = bayerMatrix8x8[matrixY][matrixX] / 64;
          
          if (distanceFactor > threshold * 0.8) {
            ctx.fillRect(x, y, patternSize, patternSize);
          }
        }
      }
      
      // Add subtle noise overlay
      for (let y = 0; y < canvas.height; y += patternSize * 2) {
        for (let x = 0; x < canvas.width; x += patternSize * 2) {
          if (Math.random() > 0.97) {
            ctx.fillRect(x, y, patternSize, patternSize);
          }
        }
      }
    };

    // Initial setup
    updateCanvasSize();

    // Handle window resize
    window.addEventListener('resize', updateCanvasSize);

    // Animate subtle changes to the pattern
    let animationFrame: number;
    const animate = () => {
      // Subtle animation - redraw with slight variations every few seconds
      if (Math.random() > 0.99) {
        drawDitheredPattern();
      }
      animationFrame = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      cancelAnimationFrame(animationFrame);
    };
  }, [primaryColor, secondaryColor, patternSize]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full z-10 ${className}`}
      style={{ pointerEvents: 'none' }}
    />
  );
}
