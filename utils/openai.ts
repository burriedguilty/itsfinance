export async function generateImage(profileUrl: string, backgroundUrl: string): Promise<string> {
  console.log('🖼️ Generating image with:', { profileUrl, backgroundUrl });

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      // Tidak perlu set OpenAI-Version manual
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content:
            'You are a professional photo editor specializing in creating high-quality profile pictures. Your task is to combine a profile photo with a background in a way that looks natural and professional.'
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Ubah background gambar kedua dengan gambar pertama, jadikan karakter memiliki latar belakang baru.'
            },
            {
              type: 'image_url',
              image_url: { url: profileUrl }
            },
            {
              type: 'image_url',
              image_url: { url: backgroundUrl }
            }
          ]
        }
      ],
      max_tokens: 300
    })
  });

  console.log('📡 OpenAI Response Headers:', {
    status: response.status,
    statusText: response.statusText,
    headers: Object.fromEntries(response.headers.entries())
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('❌ OpenAI API Error:', errorText);
    throw new Error(`Image generation failed: ${response.status} ${response.statusText}\n${errorText}`);
  }

  const result = await response.json();

  console.log('✅ OpenAI Response JSON:', result);

  // Perhatikan: hasil dari API ini biasanya berupa content, bukan URL image langsung
  // Kalau kamu pakai OpenAI untuk generate *image output*, kamu butuh endpoint `/v1/images/generations` bukan chat API
  // Jadi pastikan kamu dapat URL image valid di response
  if (!result.choices?.[0]?.message?.content) {
    throw new Error('No content found in OpenAI response.');
  }

  return result.choices[0].message.content;
}
