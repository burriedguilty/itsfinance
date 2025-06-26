import { NextRequest, NextResponse } from 'next/server';
import { generateImageWithReplicate } from '@/utils/generateImageWithReplicate';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const image = formData.get('image') as File;
    const background = formData.get('background') as string;

    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      );
    }

    // Convert File to Buffer
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Convert buffer to base64 data URL
    const base64Image = `data:${image.type};base64,${buffer.toString('base64')}`;

    // Process image through our pipeline
    const generatedImageUrl = await generateImageWithReplicate(base64Image, background);

    // Download the final image
    const response = await fetch(generatedImageUrl);
    const imageBlob = await response.blob();

    return new NextResponse(imageBlob, {
      headers: {
        'Content-Type': imageBlob.type,
      },
    });
  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    );
  }
}
