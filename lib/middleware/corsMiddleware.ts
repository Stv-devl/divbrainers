import { NextResponse } from 'next/server';
import { handleError } from '../helpers/errors/handleError';

const originRegex = process.env.ORIGIN_REGEX;

if (!originRegex) {
  throw new Error('ORIGIN_REGEX is not defined in environment variables');
}

const allowedOrigins = new RegExp(originRegex, 'i');

/**
 * Middleware to handle CORS requests.
 * @param request - The incoming request
 * @returns NextResponse | null - Blocks if the origin is not allowed, otherwise null
 */
export function corsMiddleware(request: Request): NextResponse | null {
  const method = request.method.toUpperCase();

  if (method === 'OPTIONS') return null;

  const origin = request.headers.get('origin');
  if (!origin) return null;

  if (!allowedOrigins.test(origin)) {
    return handleError(403, 'Forbidden: Unauthorized request origin');
  }

  return null;
}
