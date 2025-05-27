/**
 * Cleans and parses a JSON string by removing markdown code block markers
 * @param {string} raw - The raw JSON string to clean and parse
 * @returns {unknown} The parsed JSON data
 */
export function cleanAndParseJSON(raw: string) {
  const cleaned = raw
    .trim()
    .replace(/^```json\n?/, '')
    .replace(/\n?```$/, '');
  return JSON.parse(cleaned);
}
