"use client";

import { useState } from 'react';
import { Button } from './button';
import { Input } from './input';
import { Card } from './card';

export function EmojiGenerator({ onEmojiGenerated }: { onEmojiGenerated: (url: string) => void }) {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const response = await fetch('/api/generate-emoji', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate emoji');
      }

      const data = await response.json();
      onEmojiGenerated(data.url);
    } catch (error) {
      console.error('Error generating emoji:', error);
    } finally {
      setIsGenerating(false);
      setPrompt('');
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4 p-4">
        <Input
          type="text"
          placeholder="Enter your emoji prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={isGenerating}
        />
        <Button 
          type="submit" 
          disabled={isGenerating || !prompt.trim()} 
          className="w-full bg-black text-white hover:bg-gray-800"
        >
          {isGenerating ? 'Generating...' : 'Generate Emoji'}
        </Button>
      </form>
    </Card>
  );
}