import { processProfileImage } from './processImage';

const REMOVAL_API_KEY = '6489c1f47f37640001bcd4c3-gentolet9909';

export async function removeBackground(imageBuffer: Buffer): Promise<string> {
  // First process the image to ensure proper positioning
  const processedImage = await processProfileImage(imageBuffer);

  const formData = new FormData();
  formData.append('image_file', new Blob([processedImage.buffer]), 'image.png');

  console.log('🎨 Removing background with removal.ai...');
  const response = await fetch('https://api.removal.ai/3.0/remove', {
    method: 'POST',
    headers: {
      'Rm-Token': REMOVAL_API_KEY
    },
    body: formData
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Removal.ai failed: ${response.statusText}. ${errorData.errors?.[0] || ''}`);
  }

  const result = await response.json();
  console.log('✅ Got transparent PFP URL:', result.url);
  return result.url;
}
