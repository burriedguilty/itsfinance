import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const folder = req.nextUrl.searchParams.get('folder') || 'MEME';
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return new Response('Missing Cloudinary credentials', { status: 500 });
  }

  const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/search`;

  const body = {
    expression: `folder:${folder}`,
    max_results: 100,
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    return new Response('Failed to fetch from Cloudinary', { status: 500 });
  }

  const data = await response.json();
  type CloudinaryResource = { secure_url: string };
  return Response.json((data.resources as CloudinaryResource[]).map((r) => r.secure_url));
}
