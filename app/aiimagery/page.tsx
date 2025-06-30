'use client';

import React, { useState, useRef, ChangeEvent } from 'react';
import { generateImageWithBFL, pollImageGeneration } from '@/utils/bflImageGeneration';
import { checkRateLimit, getRateLimitInfo } from '@/utils/rateLimit';
import Image from 'next/image';
import GlitchHeading from '@/components/GlitchHeading';
import '@/styles/metallic.css';
import '@/styles/button-glow.css';
import '@/styles/glitch.css';
import '@/styles/heading-glitch.css';

const AIImagery = () => {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);


  const validateImage = async (file: File): Promise<boolean> => {
    return new Promise<boolean>((resolve) => {
      const img = document.createElement('img');
      const objectUrl = URL.createObjectURL(file);
      
      img.onload = () => {
        URL.revokeObjectURL(objectUrl); // Clean up
        const aspectRatio = img.width / img.height;
        resolve(Math.abs(aspectRatio - 1) < 0.01); // Allow tiny deviation from 1:1
      };
      
      img.onerror = () => {
        URL.revokeObjectURL(objectUrl); // Clean up
        resolve(false);
      };
      
      img.src = objectUrl;
    });
  };

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    // Check aspect ratio
    const isValidRatio = await validateImage(file);
    if (!isValidRatio) {
      setError('Please upload a square (1:1) image');
      return;
    }

    // If all validations pass, load the image
    const reader = new FileReader();
    reader.onloadend = () => {
      setSourceImage(reader.result as string);
      setError('');
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = async () => {
    if (!sourceImage || !prompt) {
      setError('Please upload an image and provide a prompt');
      return;
    }

    // Check rate limit (using a dummy user ID for now)
    // In production, you'd get this from your auth system
    const dummyUserId = 'user123';
    const canProceed = checkRateLimit(dummyUserId);
    if (!canProceed) {
      const info = getRateLimitInfo(dummyUserId);
      const resetDate = new Date(info?.resetTime || 0).toLocaleString();
      setError(`Daily limit reached. Try again after ${resetDate}`);
      return;
    }

    try {
      setIsLoading(true);
      setError('');

      // Initial generation request
      const response = await generateImageWithBFL({
        image: sourceImage,
        prompt,
      });

      // Poll for results
      const pollStatus = async (taskId: string) => {
        try {
          const result = await pollImageGeneration(taskId);
          
          switch (result.status) {
            case 'Ready':
              if (result.imageUrl) {
                setGeneratedImage(result.imageUrl);
                setIsLoading(false);
              }
              break;
              
            case 'Error':
            case 'Failed':
              setError(result.error || 'Generation failed');
              setIsLoading(false);
              break;
              
            case 'Processing':
              // Poll again after 2 seconds
              setTimeout(() => pollStatus(taskId), 2000);
              break;
          }
        } catch (error) {
          setError(error instanceof Error ? error.message : 'An error occurred');
          setIsLoading(false);
        }
      };

      pollStatus(response.task_id);

    } catch {
      setError('Error generating image');
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* Main content */}

      {/* Main content */}
      <main className="container mx-auto px-4 py-8 relative z-30">
        <div className="bg-gradient-to-br from-[#001830] to-[#000c24] border border-blue-400/30 rounded-lg p-6 hover:border-blue-300/50 transition-all duration-500 shadow-lg shadow-blue-500/20 relative overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <GlitchHeading 
              text="AI IMAGE GENERATOR"
              className="text-2xl text-blue-100 font-mono tracking-wider drop-shadow-[0_0_3px_rgba(147,197,253,0.5)] uppercase"
            />
            <span className="status-text recording text-sm">TRANSFORM YOUR REALITY</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Upload & Input */}
            <div className="space-y-6">
              {/* Image Upload */}
              <div className="bg-[#001020] rounded-lg p-6 border border-blue-400/20 shadow-inner shadow-blue-500/10">
                <h2 className="text-blue-100 font-georgia text-lg mb-4">1. Upload Source Image</h2>
                <div className="flex flex-col items-center space-y-4">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-5 py-2 bg-[#001428] border border-blue-400/50 text-blue-300 hover:border-blue-300 hover:text-blue-100 transition-all duration-300 rounded-md font-mono tracking-wider shadow-sm shadow-blue-500/20 button-glow"
                  >
                    Upload Image
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  {sourceImage && (
                    <div className="relative w-full h-64 mt-4 border border-blue-400/30 rounded-lg overflow-hidden">
                      <Image
                        src={sourceImage}
                        alt="Source"
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Prompt Input */}
              <div className="bg-[#001020] rounded-lg p-6 border border-blue-400/20 shadow-inner shadow-blue-500/10">
                <h2 className="text-blue-100 font-georgia text-lg mb-4">2. Enter Prompt</h2>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full p-4 bg-[#000c1a] border border-blue-400/30 rounded-lg text-blue-100 font-mono focus:border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-300/50 placeholder-blue-300/50"
                  rows={4}
                  placeholder="Describe how you want to transform the image..."
                />
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={isLoading || !sourceImage || !prompt}
                className="w-full px-6 py-3 bg-[#001428] border border-blue-400/50 text-blue-300 hover:border-blue-300 hover:text-blue-100 transition-all duration-300 rounded-md font-mono tracking-wider shadow-sm shadow-blue-500/20 button-glow disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-blue-400/50 disabled:hover:text-blue-300"
              >
                {isLoading ? 'GENERATING...' : 'GENERATE'}
              </button>

              {/* Error Display */}
              {error && (
                <div className="text-red-400 font-mono text-sm mt-4 p-4 border border-red-500/30 rounded-lg bg-red-500/10">
                  {error}
                </div>
              )}
            </div>

            {/* Right Column - Generated Image */}
            <div className="bg-[#001020] rounded-lg p-6 border border-blue-400/20 shadow-inner shadow-blue-500/10 flex flex-col items-center justify-center min-h-[400px]">
              {generatedImage ? (
                <div className="space-y-4 w-full">
                  <h2 className="text-blue-100 font-georgia text-lg">Generated Result</h2>
                  <div className="relative w-full h-[400px] border border-blue-400/30 rounded-lg overflow-hidden">
                    <Image
                      src={generatedImage}
                      alt="Generated"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              ) : (
                <div className="text-blue-300/50 font-mono text-center">
                  Generated image will appear here
                </div>
              )}
            </div>
          </div>
        </div>
      </main>


    </div>
  );
};

export default AIImagery;
