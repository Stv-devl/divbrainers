/**
 * Handles server action errors by throwing a new error with the specified status code and message
 * @param status - The HTTP status code to set on the error
 * @param message - The error message to throw
 * @returns Never returns, throws an error
 */
export function handleServerActionError(
  status: number,
  message: string
): never {
  const error = new Error(message) as unknown as Error & { statusCode: number };
  error.statusCode = status;
  throw error;
}
