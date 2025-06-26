import { NextRequest, NextResponse } from 'next/server';
import { uploadToCloudinary } from '@/utils/cloudinary';
import { generatePFPWithRemovalAI } from '@/utils/generatePFPWithRemovalAI';
import { generateImageWithReplicate } from '@/utils/generateImageWithReplicate';

export async function POST(req: NextRequest) {
  console.log('🚀 Starting PFP generation...');

  try {
    const formData = await req.formData();
    const backgroundPath = formData.get('backgroundPath') as string;
    const profileFile = formData.get('profile') as File;

    if (!backgroundPath || !profileFile) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Upload PFP to Cloudinary
    const profileBuffer = Buffer.from(await profileFile.arrayBuffer());
    const profileUrl = await uploadToCloudinary(
      profileBuffer,
      profileFile.name || 'profile.png'
    );

    console.log('✅ Profile uploaded:', profileUrl);
    console.log('✅ Using background:', backgroundPath);

    // Step 1: Generate composite with RemovalAI
    console.log('🎨 Step 1: Generating composite with RemovalAI...');
    const compositeUrl = await generatePFPWithRemovalAI(profileUrl, backgroundPath);
    console.log('✅ Composite generated:', compositeUrl);

    // Step 2: Enhance with Replicate
    console.log('🎨 Step 2: Enhancing with Replicate...');
    const finalImageUrl = await generateImageWithReplicate(compositeUrl, backgroundPath);
    console.log('✅ Final PFP generated:', finalImageUrl);

    return NextResponse.json({ imageUrl: finalImageUrl });
  } catch (error: unknown) {
    console.error('❌ Server error:', error);
    console.error('Environment variables status:');
    console.error('REPLICATE_API_TOKEN:', process.env.REPLICATE_API_TOKEN ? 'Set' : 'Not set');
    console.error('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME ? 'Set' : 'Not set');
    console.error('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY ? 'Set' : 'Not set');
    console.error('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? 'Set' : 'Not set');
    
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json(
      { error: 'Internal Server Error', details: errorMessage },
      { status: 500 }
    );
  }
}
