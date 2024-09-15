import { useEffect, useState } from 'react';
import { getAllEmojis } from '@/utils/supabase';
import { createClient } from '@supabase/supabase-js';

interface Emoji {
  id: number;
  image_url: string;
  prompt: string;
  likes_count: number;
  creator_user_id: string;
}

export function EmojiGrid() {
  const [emojis, setEmojis] = useState<Emoji[]>([]);

  useEffect(() => {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

    async function fetchEmojis() {
      const fetchedEmojis = await getAllEmojis();
      setEmojis(fetchedEmojis);
    }

    fetchEmojis();

    const subscription = supabase
      .channel('public:emojis')
      .on('INSERT', (payload) => {
        setEmojis((prevEmojis) => [payload.new as Emoji, ...prevEmojis]);
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 mt-8">
      {emojis.map((emoji) => (
        <div key={emoji.id} className="border rounded p-2">
          <img src={emoji.image_url} alt={emoji.prompt} className="w-full h-auto" />
          <p className="mt-2 text-sm">{emoji.prompt}</p>
          <p className="text-xs text-gray-500">Likes: {emoji.likes_count}</p>
        </div>
      ))}
    </div>
  );
}