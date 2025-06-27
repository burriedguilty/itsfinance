'use client';

import React, { useState, useRef, ChangeEvent } from 'react';
import { generateImageWithBFL, pollImageGeneration } from '@/utils/bflImageGeneration';
import Image from 'next/image';

const AIImagery = () => {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSourceImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!sourceImage || !prompt) {
      setError('Please upload an image and provide a prompt');
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
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">AI Image Generator</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
        {/* Image Upload */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">1. Upload Source Image</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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
          </div>
          {sourceImage && (
            <div className="relative w-64 h-64">
              <Image
                src={sourceImage}
                alt="Source"
                fill
                className="object-contain"
              />
            </div>
          )}
        </div>

        {/* Prompt Input */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">2. Enter Prompt</h2>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full p-2 border rounded"
            rows={3}
            placeholder="Describe how you want to transform the image..."
          />
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={isLoading || !sourceImage || !prompt}
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
        >
          {isLoading ? 'Generating...' : 'Generate'}
        </button>

        {/* Error Display */}
        {error && (
          <div className="text-red-500">{error}</div>
        )}

        {/* Generated Image Display */}
        {generatedImage && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Generated Result</h2>
            <div className="relative w-64 h-64">
              <Image
                src={generatedImage}
                alt="Generated"
                fill
                className="object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIImagery;
