import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server'; // Correct import for server-side usage
import { createClient } from '@supabase/supabase-js';
import { generateEmoji } from '@/lib/replicate';

// Create Supabase client
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function POST(request: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // Generate emoji using Replicate
    const emojiUrl = await generateEmoji(prompt);

    if (!emojiUrl) {
      return NextResponse.json({ error: 'Failed to generate emoji' }, { status: 500 });
    }

    console.log('Generated Emoji URL:', emojiUrl); // Log the URL

    // Upload emoji to Supabase storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('emojis')
      .upload(`${userId}/${Date.now()}.png`, await fetch(emojiUrl).then(res => res.blob()));

    if (uploadError) {
      console.error('Error uploading to Supabase:', uploadError);
      return NextResponse.json({ error: 'Failed to upload emoji' }, { status: 500 });
    }

    // Get public URL of the uploaded image
    const { data: { publicUrl } } = supabase.storage
      .from('emojis')
      .getPublicUrl(uploadData.path);

    console.log('Public URL:', publicUrl); // Log the public URL

    // Insert emoji data into the database
    const { data: insertData, error: insertError } = await supabase
      .from('emojis')
      .insert({
        image_url: publicUrl,
        prompt: prompt,
        creator_user_id: userId
      })
      .select();

    if (insertError) {
      console.error('Error inserting into database:', insertError);
      return NextResponse.json({ error: 'Failed to save emoji data' }, { status: 500 });
    }

    // Log the final response
    console.log('API Response:', { emoji: insertData[0] });

    return NextResponse.json({ emoji: insertData[0] });
  } catch (error) {
    console.error('Error in generate-emoji route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}