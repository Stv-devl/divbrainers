export const cleanText = (rawText: string): string => {
  return rawText
    .replace(/[\r\n]+/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .replace(/[^\wÀ-ÿ.,;:!?()\/&'"\s-]/g, '')
    .trim();
};
