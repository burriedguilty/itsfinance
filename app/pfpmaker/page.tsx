'use client';

import React, { useState, useCallback } from 'react';
import { getRandomBackground, Background } from '@/config/backgrounds';
import GlitchImage from '@/components/GlitchImage';
import ImageUploader from '@/components/ImageUploader';

export default function PFPMaker() {
  // Phase 1 state
  const [, setCurrentBackground] = useState<Background | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Phase 2 state
  const [isPhase2, setIsPhase2] = useState(false);

  // Get a new random background
  const refreshBackground = useCallback(() => {
    const newBackground = getRandomBackground();
    console.log('New background selected:', newBackground);
    setCurrentBackground(newBackground);
  }, []);

  const handleProfileSelect = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setProfileImage(file);
        setProfilePreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = async () => {
    if (!profileImage) {
      setError('Please upload a profile picture');
      return;
    }
    
    // Always get a new random background when generating
    refreshBackground();
    
    // Wait a moment for the background to be set
    await new Promise(resolve => setTimeout(resolve, 100));

    setError(null);
    setIsGenerating(true);
    // Reset state for new generation

    try {
      const background = getRandomBackground();
      console.log('Submitting with:', {
        background,
        profileImage: {
          name: profileImage.name,
          type: profileImage.type,
        }
      });

      const formData = new FormData();
      formData.append('backgroundPath', background.path);
      formData.append('profile', profileImage);

      // Generate composite
      const compositeResponse = await fetch('/api/generate-pfp', {
        method: 'POST',
        body: formData,
      });

      if (!compositeResponse.ok) {
        throw new Error('Failed to generate composite');
      }

      const compositeData = await compositeResponse.json();
      setGeneratedImage(compositeData.imageUrl);
      // Set the generated image
    } catch (err) {
      setError('Failed to generate PFP. Please try again.');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    if (!generatedImage) return;

    try {
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'pfp-composite.png';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      // Reset Phase 1 state
      setProfileImage(null);
      setProfilePreview(null);
      setGeneratedImage('');
      setCurrentBackground(null);
      setError(null);
      setIsGenerating(false);
      
      // Start Phase 2
      setIsPhase2(true);
    } catch (err) {
      console.error('Failed to download image:', err);
      setError('Failed to download image. Please try again.');
    }
  };

  return (
    <div className="text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl text-blue-100 font-mono tracking-widest drop-shadow-[0_0_3px_rgba(147,197,253,0.5)] mb-6 font-bold uppercase">FIX MY FINANCE</h1>
        <div className={`bg-gradient-to-br from-[#001830] to-[#000c24] border border-blue-400/30 rounded-lg p-6 hover:border-blue-300/50 transition-all duration-500 shadow-lg shadow-blue-500/20 ${isGenerating ? 'glitch-container' : ''}`}>
          <div className="max-w-sm mx-auto">
            {isPhase2 ? (
              // Phase 2: BFL AI Enhancement
              <div className="bg-[#001020] rounded-lg overflow-hidden border border-blue-400/20 p-3 shadow-inner shadow-blue-500/10">
                <div>
                  {/* Placeholder for future content */}
                </div>
              </div>
            ) : (
              // Phase 1: Composite Generation
              <div className="bg-[#001020] rounded-lg overflow-hidden border border-blue-400/20 p-3 shadow-inner shadow-blue-500/10">
                {!profileImage ? (
                  <ImageUploader
                    label="Upload Profile Picture"
                    onImageSelect={handleProfileSelect}
                    previewUrl={null}
                  />
                ) : generatedImage ? (
                  <div className="mt-4 space-y-4">
                    <div className="relative overflow-hidden rounded-lg shadow-lg w-full">
                      <div className="w-full aspect-square">
                        <GlitchImage 
                          src={generatedImage} 
                          alt="Generated PFP" 
                          isGlitching={isGenerating}
                        />
                      </div>
                    </div>
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={handleDownload}
                        disabled={isGenerating}
                        className={`w-full px-4 py-2 rounded font-mono tracking-wider transition-all text-sm
                          ${isGenerating
                            ? 'bg-[#001428]/50 border border-blue-400/30 text-blue-300/50 cursor-not-allowed'
                            : 'bg-[#001428] border border-blue-400/50 text-blue-300 hover:border-blue-300 hover:text-blue-100 shadow-sm shadow-blue-500/20 button-glow'}
                        `}
                      >
                        Download
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="relative overflow-hidden rounded-lg shadow-lg w-full">
                    <div className="w-full aspect-square">
                      <GlitchImage 
                        src={profilePreview!} 
                        alt="Profile Preview" 
                        isGlitching={false}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mt-3 p-2 bg-red-500/10 border border-red-400/30 rounded text-red-300 font-mono text-sm">
                {error}
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-4 flex flex-col gap-3 items-center">
              {/* Phase 1: Generate Button */}
              {!isPhase2 && profileImage && !generatedImage && (
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className={`w-full px-4 py-2 rounded font-mono tracking-wider transition-all text-sm
                    ${isGenerating
                      ? 'bg-[#001428]/50 border border-blue-400/30 text-blue-300/50 cursor-not-allowed'
                      : 'bg-[#001428] border border-blue-400/50 text-blue-300 hover:border-blue-300 hover:text-blue-100 shadow-sm shadow-blue-500/20 button-glow'}
                  `}
                >
                  {isGenerating ? 'Generating...' : 'Generate PFP'}
                </button>
              )}

              {/* Phase 1: Reset Button */}
              {!isPhase2 && (profileImage || generatedImage) && (
                <button
                  onClick={() => {
                    setProfileImage(null);
                    setProfilePreview(null);
                    setGeneratedImage('');
                    setCurrentBackground(null);
                    setError(null);
                  }}
                  className="text-blue-400/70 hover:text-blue-300 font-mono text-xs underline underline-offset-4"
                >
                  Upload Different Picture
                </button>
              )}


            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
