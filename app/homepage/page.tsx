'use client';

import dynamic from 'next/dynamic';

// Import the Homepage component dynamically
const Homepage = dynamic(() => import('@/components/Homepage'), { ssr: false });

export default function HomepagePage() {
  return <Homepage />;
}
