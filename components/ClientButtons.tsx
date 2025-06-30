'use client';

import { useApp } from '@/context/AppContext';
import SillyButtonB from '@/components/SillyButtonB';

export default function ClientButtons() {
  const { isSillyMode, setIsSillyMode } = useApp();

  return (
    <div className="fixed bottom-8 left-8 z-[999]">
      <SillyButtonB 
        isActive={isSillyMode}
        onActivate={() => setIsSillyMode(!isSillyMode)}
      />
    </div>
  );
}
