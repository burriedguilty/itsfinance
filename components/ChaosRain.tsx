import { useEffect, useRef } from 'react';

interface ChaosRainProps {
  isActive: boolean;
}

export default function ChaosRain({ isActive }: ChaosRainProps) {
  // Timestamp untuk animasi chaos
  const startTime = useRef(Date.now());
  
  // Fungsi untuk gerakan chaos
  const chaosMovement = (time: number, initialSpeed: number, xFreq: number, yFreq: number) => {
    const t = time / 1000; // Konversi ke detik
    const speedVariation = Math.sin(t * 1.5) * 0.5 + 1; // Kecepatan 0.5-1.5x
    const xOffset = Math.sin(t * xFreq) * 15 + Math.sin(t * 0.3) * 10; // Gerakan horizontal dengan drift lambat
    const yOffset = Math.cos(t * yFreq) * 5 + Math.sin(t * 0.2) * 8; // Gerakan vertikal dengan drift lambat
    return {
      x: xOffset,
      y: initialSpeed * speedVariation + yOffset
    };
  };
  const containerRef = useRef<HTMLDivElement>(null);
  const gifCount = 25; // Tambah jumlah GIF untuk efek cluster

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const gifs: HTMLImageElement[] = [];

    // Buat dan atur GIF
    for (let i = 0; i < gifCount; i++) {
      const gif = document.createElement('img');
      gif.src = '/images/rainchaos.gif';
      gif.className = 'absolute';
      // Set initial speed dan frequency yang random untuk tiap GIF
      // Speed berdasarkan posisi horizontal (cluster)
      const posX = parseFloat(gif.style.left);
      // Base speed yang lebih lambat dengan 3 tier kecepatan
      let baseSpeed;
      if (Math.random() < 0.2) { // 20% sangat lambat
        baseSpeed = Math.random() * 0.5 + 0.3; // 0.3-0.8
      } else if (Math.random() < 0.5) { // 30% medium
        baseSpeed = Math.random() * 0.7 + 0.8; // 0.8-1.5
      } else { // 50% normal
        baseSpeed = Math.random() * 1 + 1.5; // 1.5-2.5
      }
      const initialSpeed = baseSpeed * (posX > 50 ? 1.2 : 1);
      // Frekuensi gerakan yang lebih lambat
      const xFreq = Math.random() * 1.5 + 0.2; // 0.2-1.7 Hz horizontal
      const yFreq = Math.random() * 0.8 + 0.1; // 0.1-0.9 Hz vertical
      gif.dataset.speed = initialSpeed.toString();
      gif.dataset.xFreq = xFreq.toString();
      gif.dataset.yFreq = yFreq.toString();

      gif.style.cssText = `
        width: 100px;
        height: auto;
        opacity: 0.9;
        pointer-events: none;
        z-index: 30;
        position: fixed;
        transition: transform 0.1s linear;
      `;
      
      // Fungsi untuk distribusi tidak seragam
      const getClusteredPosition = () => {
        // Buat beberapa cluster di posisi random
        const clusters = [
          Math.random() * 100, // Cluster 1
          Math.random() * 100, // Cluster 2
          Math.random() * 100  // Cluster 3
        ];

        // Pilih cluster secara random
        const cluster = clusters[Math.floor(Math.random() * clusters.length)];
        
        // Tambah offset random dari cluster (distribusi normal-ish)
        const offset = (Math.random() + Math.random() + Math.random() - 1.5) * 20;
        return Math.max(0, Math.min(100, cluster + offset));
      };

      // Posisi awal dengan cluster
      gif.style.top = `${Math.random() * -30}vh`;
      gif.style.left = `${getClusteredPosition()}vw`;
      
      container.appendChild(gif);
      gifs.push(gif);

      // Animasi untuk setiap GIF
      const animate = () => {
        if (!isActive) return;

        // Update posisi
        const top = parseFloat(gif.style.top);
        const left = parseFloat(gif.style.left);
        
        const time = Date.now() - startTime.current;
        const speed = parseFloat(gif.dataset.speed || '3');
        const xFreq = parseFloat(gif.dataset.xFreq || '2');
        const yFreq = parseFloat(gif.dataset.yFreq || '1');

        // Hitung gerakan chaos
        const movement = chaosMovement(time, speed, xFreq, yFreq);
        
        // Update posisi dengan gerakan chaos
        gif.style.top = `${top + movement.y}vh`;
        gif.style.left = `${left + movement.x/5}vw`;
        
        // Efek jedag jedug yang lebih chaos
        const chaosScale = 1 + Math.sin(time/200) * 0.3 + Math.cos(time/350) * 0.2;
        const chaosRotation = Math.sin(time/150) * 20 + Math.cos(time/300) * 15;
        
        gif.style.transform = `scale(${chaosScale}) rotate(${chaosRotation}deg)`;
        
        // Tidak ada rotasi atau scaling
        
        // Reset posisi jika keluar layar
        if (parseFloat(gif.style.top) > 100) {
          // Reset dengan posisi cluster baru
          gif.style.top = `${(Math.random() * -20) - 10}vh`; // -30vh sampai -10vh
          gif.style.transform = 'scale(0.5) rotate(0deg)';
          gif.style.left = `${getClusteredPosition()}vw`;
        }
        
        requestAnimationFrame(animate);
      };
      
      requestAnimationFrame(animate);
    }

    // Cleanup
    return () => {
      gifs.forEach(gif => gif.remove());
    };
  }, [isActive]);

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none transition-opacity duration-300 overflow-hidden z-40 ${
        isActive ? 'opacity-100' : 'opacity-0'
      }`}
    />
  );
}
