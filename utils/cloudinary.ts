import { retry } from './retry';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dfjqqnv3x",
  api_key: "611973257731778",
  api_secret: "cK0Q_7Hts6eAqLuSeWKJYPG9lyM",
  secure: true
});

export async function uploadToCloudinary(buffer: Buffer, fileName: string): Promise<string> {
  const dataURI = `data:image/jpeg;base64,${buffer.toString('base64')}`;

  return retry(() => new Promise((resolve, reject) => {
    cloudinary.uploader.upload(dataURI, {
      folder: 'pfpmaker',
      public_id: `${Date.now()}-${fileName}`,
      resource_type: 'image'
    }, (error, result) => {
      if (error || !result) {
        console.error('Cloudinary upload error:', error);
        reject(error || new Error('No result from Cloudinary'));
      } else {
        console.log('Successfully uploaded to Cloudinary:', {
          id: result.public_id,
          url: result.secure_url
        });
        resolve(result.secure_url);
      }
    });
  }), {
    retries: 3,
    delay: 2000,
    onRetry: (error, attempt) => console.log(`Retrying Cloudinary upload (${attempt}/3) after error:`, error.message)
  });
}
