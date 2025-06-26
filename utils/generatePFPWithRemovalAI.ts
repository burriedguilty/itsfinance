import sharp from 'sharp';
import axios from 'axios';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function downloadImage(url: string): Promise<Buffer> {
  const response = await axios.get(url, { 
    responseType: 'arraybuffer',
    timeout: 5000 // 5 second timeout
  });
  return Buffer.from(response.data);
}

import * as fs from 'fs/promises';
import * as path from 'path';

async function removeBackground(imageBuffer: Buffer): Promise<string> {
  // Create form data with buffer directly
  const form = new URLSearchParams();
  form.append('image_url', imageBuffer.toString('base64'));
  form.append('image_type', 'base64');

  console.log('🔑 Using Removal.AI API Key:', process.env.REMOVAL_AI_API_KEY?.substring(0, 8) + '...');

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000); // 5 second timeout

  try {
    const response = await fetch('https://api.removal.ai/3.0/remove', {
      method: 'POST',
      headers: {
        'Rm-Token': process.env.REMOVAL_AI_API_KEY as string,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: form,
      signal: controller.signal
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Removal.ai API Response:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      throw new Error(`Removal.ai API error: ${response.statusText}, details: ${errorText}`);
    }

    const data = await response.json();
    clearTimeout(timeout);
    console.log('✅ Removal.ai Response:', JSON.stringify(data, null, 2));
    
    // Get the high resolution result
    if (data?.high_resolution) {
      return data.high_resolution;
    }
    
    throw new Error('No high resolution URL in response: ' + JSON.stringify(data));
  } catch (error) {
    console.error('❌ Error in removeBackground:', error);
    throw error;
  }
}

async function uploadToCloudinary(imageBuffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ resource_type: 'image' }, (error, result) => {
        if (error) reject(error);
        else resolve(result!.secure_url);
      })
      .end(imageBuffer);
  });
}

export async function generatePFPWithRemovalAI(pfpUrl: string, bgUrl: string): Promise<string> {
  try {
    console.log('📥 Downloading profile image...');
    const pfpBuffer = await downloadImage(pfpUrl);

    console.log('🎭 Removing background from profile image...');
    const transparentPfpUrl = await removeBackground(pfpBuffer);
    console.log('✅ Got transparent PFP URL:', transparentPfpUrl);

    // Download the transparent PFP
    console.log('📥 Downloading transparent PFP...');
    const transparentPfpBuffer = await downloadImage(transparentPfpUrl);

    console.log('📥 Downloading background image...');
    const bgBuffer = await downloadImage(bgUrl);

    console.log('🎨 Compositing images...');
    try {
      // Convert and resize background to 800x800 for faster processing
      const resizedBg = await sharp(bgBuffer)
        .resize(800, 800, {
          fit: 'cover',
          position: 'center'
        })
        .jpeg({ quality: 85 })
        .toBuffer();
      console.log('✅ Background resized successfully');

      // Get profile image dimensions
      const pfpMetadata = await sharp(transparentPfpBuffer).metadata();
      const pfpAspectRatio = (pfpMetadata.width || 1) / (pfpMetadata.height || 1);
      
      // Calculate target dimensions to maintain aspect ratio
      const targetSize = 750; // Reduced size for faster processing
      let pfpWidth = targetSize;
      let pfpHeight = targetSize;
      
      if (pfpAspectRatio > 1) {
        // Image is wider than tall
        pfpHeight = Math.round(targetSize / pfpAspectRatio);
      } else {
        // Image is taller than wide
        pfpWidth = Math.round(targetSize * pfpAspectRatio);
      }

      // Process the transparent PFP
      console.log('💾 Processing transparent PFP...', { width: pfpWidth, height: pfpHeight });
      const resizedPfp = await sharp(transparentPfpBuffer)
        .resize(pfpWidth, pfpHeight, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .toBuffer();
      console.log('✅ Profile image resized successfully');

      // Calculate position for the profile image
      const canvasSize = 800;
      const yOffset = 100; // Distance from bottom
      
      // Composite directly onto background
      const finalImage = await sharp(resizedBg)
        .composite([{
          input: resizedPfp,
          gravity: 'south',
          left: Math.floor((canvasSize - pfpWidth) / 2), // Center horizontally
          top: yOffset // Distance from bottom
        }])
        .jpeg({ quality: 85 })
        .toBuffer();
      console.log('✅ Images composited successfully');

      console.log('☁️ Uploading to Cloudinary...');
      const cloudinaryUrl = await uploadToCloudinary(finalImage);

      console.log('✅ Process completed successfully');
      return cloudinaryUrl;
    } catch (sharpError) {
      console.error('❌ Error in image processing:', sharpError);
      throw sharpError;
    }
  } catch (error) {
    console.error('❌ Error in generatePFPWithRemovalAI:', error);
    throw error;
  }
}
