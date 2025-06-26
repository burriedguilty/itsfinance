import Replicate from 'replicate';
import { v2 as cloudinary } from 'cloudinary';

async function downloadAndConvertToBase64(url: string): Promise<string> {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  const base64 = Buffer.from(buffer).toString('base64');
  return `data:${response.headers.get('content-type') || 'image/jpeg'};base64,${base64}`;
}

export async function generateImageWithReplicate(profileUrl: string, backgroundUrl: string): Promise<string> {
  console.log('🚀 Sending request to Replicate...');

  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });

  const input = {
    input_image: profileUrl,
    prompt: 'blend the character to the current background theme,add vhs effect to the image',
    output_format: 'jpg'
  };

  console.log('📥 Running Replicate model with input:', JSON.stringify(input, null, 2));

  try {
    const output = await replicate.run(
      'black-forest-labs/flux-kontext-max',
      { input }
    );

    console.log('✅ Replicate generation complete:', output);

    // Upload buffer to Cloudinary
    if (output instanceof ReadableStream) {
      const reader = output.getReader();
      const chunks: Uint8Array[] = [];
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
      }

      const buffer = Buffer.concat(chunks);
      
      // Configure Cloudinary
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });

      // Upload buffer directly
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'enhanced' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(buffer);
      });

      return (result as any).secure_url;
    }

    throw new Error('Unexpected output format from Replicate');
  } catch (error) {
    console.error('❌ Replicate generation failed:', error);
    throw error;
  }
}
