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
    const parsed = JSON.parse(jsonStr);
    if (parsed === null || typeof parsed !== 'object') {
      throw new Error();
    }
    return parsed;
  } catch {
    throw handleServerActionError(400, errorMessage);
  }
};
