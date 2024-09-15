'use client';

import { useState } from 'react';
import { EmojiGenerator } from '../components/ui/EmojiGenerator';
import { EmojiGrid } from '../components/ui/EmojiGrid';
import { EmojiForm } from '@/components/ui/emoji-form';

interface Emoji {
  id: number;
  image_url: string;
  prompt: string;
  likes_count: number;
  creator_user_id: string;
  created_at: string;
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">Emoji Maker</h1>
      <EmojiForm />
      <EmojiGrid />
    </main>
  );
}
