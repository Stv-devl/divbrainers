export function handleServerActionError(
  status: number,
  message: string
): never {
  const error = new Error(message) as unknown as Error & { statusCode: number };
  error.statusCode = status;
  throw error;
}
