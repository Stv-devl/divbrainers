import { google } from '@ai-sdk/google';
import { generateText, GenerateTextResult, ToolSet } from 'ai';

type SimpleGenerateTextResult = GenerateTextResult<ToolSet, string>;

/**
 * Generate text from Gemini and return the `text` output.
 * @param prompt - The text prompt to send to the model
 * @param temperature - Optional temperature
 * @returns The generated text output
 */
export async function askAI(
  prompt: string,
  temperature: number
): Promise<string> {
  const result: SimpleGenerateTextResult = await generateText({
    model: google('gemini-2.0-flash-001'),
    prompt,
    temperature,
  });

  if (!result.text || typeof result.text !== 'string') {
    throw new Error('AI response missing text output.');
  }

  return result.text;
}
