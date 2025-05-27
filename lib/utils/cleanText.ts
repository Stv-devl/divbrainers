/**
 * Cleans a text by removing markdown code block markers
 * @param {string} rawText - The raw text to clean
 * @returns {string} The cleaned text
 */
export const cleanText = (rawText: string): string => {
  return rawText
    .replace(/[\r\n]+/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .replace(/[^\wÀ-ÿ.,;:!?()\/&'"\s-]/g, '')
    .trim();
};
