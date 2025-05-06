import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/authOptions';
import { handleError } from '../helpers/errors/handleError';

/**
 * Middleware to check user authentication
 * @param request - The incoming request
 * @returns NextResponse | { userId: string } - Error response or userId
 */
export async function authMiddleware(): Promise<
  { userId: string } | NextResponse
> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return handleError(401, 'Unauthorized access');
  }

  const userId = session.user.id;

  if (typeof userId !== 'string' || userId.length < 10) {
    return handleError(400, 'Invalid user ID format');
  }

  return { userId };
}
