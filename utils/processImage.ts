import sharp from 'sharp';

interface ProcessedImage {
  buffer: Buffer;
  width: number;
  height: number;
}

export async function processProfileImage(imageBuffer: Buffer): Promise<ProcessedImage> {
  const image = sharp(imageBuffer);

  // Step 1: Trim transparansi (biar karakter ngepas)
  const trimmed = image.trim();

  // Step 2: Dapatkan metadata setelah trim
  const trimMetadata = await trimmed.metadata();
  if (!trimMetadata.width || !trimMetadata.height) {
    throw new Error('Could not read trimmed dimensions');
  }

  // Step 3: Set target dimensions
  const canvasWidth = 800; // Canvas width
  const canvasHeight = 800; // Canvas height
  const topMarginPercent = 0.13; // 13% margin from top
  const topMargin = Math.round(canvasHeight * topMarginPercent);
  
  // Step 4: Calculate dimensions to fill width while maintaining aspect ratio
  const aspectRatio = trimMetadata.width / trimMetadata.height;
  let targetWidth = canvasWidth;
  let targetHeight = Math.round(canvasWidth / aspectRatio);

  // If image is too tall after filling width, scale it down
  const maxAllowedHeight = canvasHeight - topMargin;
  if (targetHeight > maxAllowedHeight) {
    targetHeight = maxAllowedHeight;
    targetWidth = Math.round(targetHeight * aspectRatio);
  }

  // Center horizontally if image is narrower than canvas
  const leftPadding = Math.max(0, Math.round((canvasWidth - targetWidth) / 2));

  // Step 5: Resize image
  const resized = trimmed.resize(targetWidth, targetHeight, {
    fit: 'fill',
    position: 'center'
  });

  // Step 6: Place on canvas with proper padding
  const finalBuffer = await resized.extend({
    top: topMargin,
    bottom: canvasHeight - (topMargin + targetHeight),
    left: leftPadding,
    right: leftPadding,
    background: { r: 0, g: 0, b: 0, alpha: 0 }
  }).toBuffer();

  return {
    buffer: finalBuffer,
    width: canvasWidth,
    height: canvasHeight
  };
}
