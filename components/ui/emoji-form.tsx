import { useState } from 'react';
import { Button } from './button';
import { Input } from './input';

export function EmojiForm() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedEmoji, setGeneratedEmoji] = useState<{ id: number; image_url: string; prompt: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-emoji', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate emoji');
      }

      const data = await response.json();
      setGeneratedEmoji(data.emoji);
    } catch (err) {
      setError('An error occurred while generating the emoji');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter a prompt for your emoji"
        disabled={isLoading}
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Generate Emoji'}
      </Button>
      {error && <p className="text-red-500">{error}</p>}
      {generatedEmoji && (
        <div>
          <img src={generatedEmoji.image_url} alt={generatedEmoji.prompt} />
          <p>Prompt: {generatedEmoji.prompt}</p>
        </div>
      )}
    </form>
  );
}