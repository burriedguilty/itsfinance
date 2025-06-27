import sharp from 'sharp';

interface ProcessedImage {
  buffer: Buffer;
  width: number;
  height: number;
}

export async function processProfileImage(imageBuffer: Buffer): Promise<ProcessedImage> {
  const image = sharp(imageBuffer);

  // Step 1: Dapatkan metadata gambar asli
  const metadata = await image.metadata();
  if (!metadata.width || !metadata.height) {
    throw new Error('Could not read original image dimensions');
  }

  // Step 2: Set target dimensions
  const canvasWidth = 800;
  const canvasHeight = 800;

  // Step 3: Hitung ukuran maksimum dan target size
  const maxCharHeight = Math.round(canvasHeight * 0.55);
  const maxCharWidth = canvasWidth;
  const aspectRatio = metadata.width / metadata.height;

  // Step 4: Mulai dengan height maksimum
  let targetHeight = maxCharHeight;
  let targetWidth = Math.round(targetHeight * aspectRatio);

  // Step 5: Jika terlalu lebar, sesuaikan berdasarkan width
  if (targetWidth > maxCharWidth) {
    targetWidth = maxCharWidth;
    targetHeight = Math.round(targetWidth / aspectRatio);
  }

  // Step 6: Hitung padding
  // Vertikal: Karakter di bawah dengan sedikit ruang aman
  const verticalPadding = canvasHeight - targetHeight;
  const safeSpace = 10; // Ruang aman 30px dari bawah
  const topPadding = verticalPadding - safeSpace;
  const bottomPadding = safeSpace;

  // Horizontal: Center karakter
  const leftPadding = Math.floor((canvasWidth - targetWidth) / 1);
  const rightPadding = Math.ceil((canvasWidth - targetWidth) / 1);

  // Step 7: Resize dan extend
  const resized = image.resize(targetWidth, targetHeight);

  const finalBuffer = await resized
    .extend({
      top: topPadding,
      bottom: bottomPadding,
      left: leftPadding,
      right: rightPadding,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .toBuffer();

  return {
    buffer: finalBuffer,
    width: canvasWidth,
    height: canvasHeight
  };
}
