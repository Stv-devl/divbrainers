import { handleServerActionError } from '../errors/handleServerActionError';

/**
 * Safely parses a JSON string and returns a valid object or array
 * Removes common Markdown fences if needed
 */
export const parseJsonSafely = (
  jsonStr: string,
  errorMessage = 'Invalid JSON'
) => {
  try {
    const cleaned = jsonStr
      .trim()
      .replace(/^```(?:json)?/i, '')
      .replace(/```$/, '');

    const parsed = JSON.parse(cleaned);

    if (typeof parsed !== 'object' || parsed === null) {
      throw new Error('Parsed JSON is not an object or array');
    }

    return parsed;
  } catch (err) {
    console.error('parseJsonSafely error:', err);
    throw handleServerActionError(400, errorMessage);
  }
};
