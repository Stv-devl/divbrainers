import { handleServerActionError } from '../errors/handleServerActionError';

/**
 * Parses a JSON string safely and returns the parsed object
 * @param jsonStr - The JSON string to parse
 * @param errorMessage - The error message to throw if the JSON string is invalid
 * @returns The parsed object
 */
export const parseJsonSafely = (
  jsonStr: string,
  errorMessage = 'Invalid JSON'
) => {
  try {
    const trimmed = jsonStr.trim();

    const start = trimmed.indexOf('[');
    const end = trimmed.lastIndexOf(']');

    if (start === -1 || end === -1 || end <= start) {
      throw new Error('No valid JSON array found');
    }

    const jsonArray = trimmed.slice(start, end + 1);

    const parsed = JSON.parse(jsonArray);

    if (!Array.isArray(parsed)) {
      throw new Error('Parsed JSON is not an array');
    }

    return parsed;
  } catch (err) {
    console.error('parseJsonSafely error:', err);
    throw handleServerActionError(400, errorMessage);
  }
};
