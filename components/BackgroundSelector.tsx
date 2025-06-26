'use client';

import React from 'react';
import Image from 'next/image';
import { backgrounds } from '@/config/backgrounds';

interface Props {
  onSelect: (id: number | null) => void;
  selectedId: number | null;
}

export default function BackgroundSelector({ onSelect, selectedId }: Props) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg text-blue-100 font-mono tracking-wider drop-shadow-[0_0_3px_rgba(147,197,253,0.5)]">Select Background</h3>
      <div className="grid grid-cols-2 gap-4">
        {backgrounds.map((bg) => (
          <button
            key={bg.id}
            onClick={() => onSelect(bg.id)}
            className={`relative aspect-video rounded-lg overflow-hidden border ${bg.id === selectedId ? 'border-blue-400 shadow-lg shadow-blue-500/30' : 'border-blue-400/20 hover:border-blue-300/50'} transition-all duration-300`}
          >
            <div key={bg.id} className="relative aspect-square group">
              <Image
                src={bg.path}
                alt={`Background ${bg.id}`}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 rounded-lg">
                <div className="text-white font-mono">
                  <div className="text-sm font-semibold tracking-wider">Background {bg.id}</div>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
