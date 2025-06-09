/**
 * Cleans and parses a JSON string by removing markdown code block markers
 * @param {string} text - The raw JSON string to clean and parse
 * @returns {string} The cleaned JSON string
 */
export function sanitizeJsonString(text: string): string {
  return text
    .replace(/^```json\s*/i, '')
    .replace(/^```/, '')
    .replace(/```$/, '')
    .replace(/\n```$/, '')
    .trim();
}
