/**
 * Sanitizes an input value by removing special characters.
 * @param value - The input value to sanitize.
 * @returns Sanitized input value.
 * @throws Error if the input value is invalid.
 */
export function sanitizeInput(value: string): string {
  const sanitized = value.replace(/[^\wÀ-ÿ0-9.,€\-:\/()% ]/g, '');
  if (sanitized.trim().length === 0) {
    throw new Error('Invalid input value');
  }
  return sanitized;
}
