'use client';

import React, { useState, useCallback } from 'react';
import { getRandomBackground, Background } from '@/config/backgrounds';
import ImageUploader from '@/components/ImageUploader';
import GlitchImage from '@/components/GlitchImage';
import ShareButton from '@/components/ShareButton';

export default function PFPMaker() {
  const [currentBackground, setCurrentBackground] = useState<Background | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

    try {
      console.log('Submitting with:', {
        background: currentBackground,
        profileImage: {
          name: profileImage.name,
          type: profileImage.type,
          size: profileImage.size
        }
      });

      const formData = new FormData();
      const background = getRandomBackground();
      formData.append('backgroundPath', background.path);
      formData.append('profile', profileImage);

      const response = await fetch('/api/generate-pfp', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to generate image');
      }

      const data = await response.json();
      setGeneratedImage(data.imageUrl);
    } catch (err) {
      setError('Failed to generate image. Please try again.');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    if (!generatedImage) return;

    const response = await fetch(generatedImage);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my_finance_pfp.png';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className="text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl text-blue-100 font-mono tracking-widest drop-shadow-[0_0_3px_rgba(147,197,253,0.5)] mb-6 font-bold uppercase">FIX MY FINANCE</h1>
        <div className={`bg-gradient-to-br from-[#001830] to-[#000c24] border border-blue-400/30 rounded-lg p-6 hover:border-blue-300/50 transition-all duration-500 shadow-lg shadow-blue-500/20 ${isGenerating ? 'glitch-container' : ''}`}>
          <div className="max-w-sm mx-auto">
            {/* Image Preview Area */}
            <div className="bg-[#001020] rounded-lg overflow-hidden border border-blue-400/20 p-3 shadow-inner shadow-blue-500/10">
              {!profileImage && !generatedImage ? (
                <ImageUploader
                  label="Upload Profile Picture"
                  onImageSelect={handleProfileSelect}
                  previewUrl={null}
                />
              ) : (
                <GlitchImage
                  src={generatedImage || profilePreview!}
                  alt={generatedImage ? 'Generated PFP' : 'Profile Preview'}
                  isGlitching={isGenerating}
                />
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-3 p-2 bg-red-500/10 border border-red-400/30 rounded text-red-300 font-mono text-sm">
                {error}
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-4 flex flex-col gap-3 items-center">
              {/* Generate Button */}
              {profileImage && !generatedImage && (
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

              {/* Generated Image Actions */}
              {generatedImage && (
                <div className="flex gap-2 w-full">
                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className={`flex-1 px-4 py-2 rounded font-mono tracking-wider transition-all text-sm
                      ${isGenerating
                        ? 'bg-[#001428]/50 border border-blue-400/30 text-blue-300/50 cursor-not-allowed'
                        : 'bg-[#001428] border border-blue-400/50 text-blue-300 hover:border-blue-300 hover:text-blue-100 shadow-sm shadow-blue-500/20 button-glow'}
                    `}
                  >
                    {isGenerating ? 'Generating...' : 'New Style'}
                  </button>
                  <button
                    onClick={handleDownload}
                    disabled={isGenerating}
                    className="flex-1 px-4 py-2 rounded font-mono tracking-wider transition-all text-sm bg-[#001428] border border-blue-400/50 text-blue-300 hover:border-blue-300 hover:text-blue-100 shadow-sm shadow-blue-500/20 button-glow"
                  >
                    Download
                  </button>
                  <ShareButton
                    className="flex-1 px-4 py-2 rounded font-mono tracking-wider transition-all text-sm bg-[#001428] border border-blue-400/50 hover:border-blue-300 shadow-sm shadow-blue-500/20 button-glow"
                  />
                </div>
              )}

              {/* Reset Button */}
              {(profileImage || generatedImage) && (
                <button
                  onClick={() => {
                    setProfileImage(null);
                    setProfilePreview(null);
                    setGeneratedImage(null);
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
