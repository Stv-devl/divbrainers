import { NextResponse } from 'next/server';
import type { NextFetchEvent, NextRequest } from 'next/server';
import { withAuth } from 'next-auth/middleware';
import type { NextRequestWithAuth } from 'next-auth/middleware';
import { getClientIp } from '../lib/helpers/security/getClientIp';
import { rateLimitMiddleware } from '../lib/middleware/rateLimitMiddleware';

export default async function middleware(
  req: NextRequest,
  event: NextFetchEvent
) {
  const pathname = req.nextUrl.pathname;
  const ip = getClientIp(req);

  if (pathname.startsWith('/api/')) {
    const rateLimitResult = rateLimitMiddleware({
      key: ip,
      limit: 30,
      ttl: 60_000,
      scope: 'ip',
    });

    if (rateLimitResult) return rateLimitResult;
  }

  const isProtectedRoute = [
    '/home',
    '/profile',
    '/quiz',
    '/coding',
    '/interview',
  ].some((path) => req.nextUrl.pathname.startsWith(path));

  if (isProtectedRoute) {
    const authMiddleware = withAuth({
      callbacks: {
        authorized: ({ token }) => !!token,
      },
      pages: {
        signIn: '/login',
      },
    });

    return authMiddleware(req as NextRequestWithAuth, event);
  }

  return NextResponse.next();
}
