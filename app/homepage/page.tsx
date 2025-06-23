'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Import the Homepage component dynamically
const Homepage = dynamic(() => import('@/components/Homepage'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-[#001122] flex items-center justify-center">
      <div className="text-blue-300 text-xl font-mono">Loading...</div>
    </div>
  ),
});

export default function HomepagePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#001122] flex items-center justify-center">
        <div className="text-blue-300 text-xl font-mono">Loading...</div>
      </div>
    }>
      <Homepage />
    </Suspense>
  );
}
