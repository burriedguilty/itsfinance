import { retry } from './retry';
import fs from 'fs';

const IMGUR_API_BASE = 'https://api.imgur.com/3';

interface ImgurUploadResponse {
  data: {
    id: string;
    link: string;
  };
  success: boolean;
  status: number;
}

export async function uploadToImgur(buffer: Buffer, fileName: string): Promise<string> {
  console.log('Uploading to Imgur:', { fileName, size: buffer.length });

  const base64Image = buffer.toString('base64');

  return await retry(async () => {
    const response = await fetch(`${IMGUR_API_BASE}/image`, {
      method: 'POST',
      headers: {
        'Authorization': `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image: base64Image,
        type: 'base64'
      })
    });

    console.log('Imgur upload response:', {
      status: response.status,
      statusText: response.statusText
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Imgur upload failed (${response.status}): ${text}`);
    }

    const data = await response.json() as ImgurUploadResponse;
    
    if (!data.success || !data.data.link) {
      throw new Error('Imgur upload failed: No image URL in response');
    }

    console.log('Successfully uploaded to Imgur:', {
      id: data.data.id,
      url: data.data.link
    });

    return data.data.link;
  }, {
    retries: 3,
    delay: 2000,
    onRetry: (error, attempt) => console.log(`Retrying Imgur upload (${attempt}/3) after error:`, error.message)
  });
}

export async function uploadFileToImgur(filePath: string): Promise<string> {
  const buffer = fs.readFileSync(filePath);
  const base64Image = buffer.toString('base64');

  return await retry(async () => {
    const response = await fetch(`${IMGUR_API_BASE}/image`, {
      method: 'POST',
      headers: {
        'Authorization': `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image: base64Image,
        type: 'base64'
      })
    });

    console.log('Imgur upload response:', {
      status: response.status,
      statusText: response.statusText
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Imgur upload failed (${response.status}): ${text}`);
    }

    const data = await response.json() as ImgurUploadResponse;
    
    if (!data.success || !data.data.link) {
      throw new Error('Imgur upload failed: No image URL in response');
    }

    console.log('Successfully uploaded to Imgur:', {
      id: data.data.id,
      url: data.data.link
    });

    return data.data.link;
  }, {
    retries: 3,
    delay: 2000,
    onRetry: (error, attempt) => console.log(`Retrying Imgur upload (${attempt}/3) after error:`, error.message)
  });
}
