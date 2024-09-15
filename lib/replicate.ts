import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function generateEmoji(prompt: string): Promise<string | null> {
  try {
    const output = await replicate.run(
      "fofr/sdxl-emoji:dee76b5afde21b0f01ed7925f0665b7e879c50ee718c5f78a9d38e04d523cc5e",
      {
        input: {
          prompt: "A TOK emoji of a " + prompt,
          apply_watermark: false
        }
      }
    );

    if (Array.isArray(output) && output.length > 0) {
      return output[0] as string;
    } else {
      console.error('Unexpected output format from Replicate');
      return null;
    }
  } catch (error) {
    console.error('Error generating emoji:', error);
    return null;
  }
}