import type { NextRequest } from 'next/server';

type AuthRequest = {
  headers?: Record<string, string | string[] | undefined>;
};

function isValidIp(ip: string): boolean {
  return /^(\d{1,3}\.){3}\d{1,3}$/.test(ip) || /^[a-fA-F0-9:]+$/.test(ip);
}

/**
 * Get the client IP address from a standard `NextRequest` object.
 */
export function getClientIp(req: NextRequest): string {
  const xff = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');

  const ip =
    xff?.split(',')[0]?.trim() ||
    realIp?.trim() ||
    (process.env.NODE_ENV !== 'production' ? '127.0.0.1' : 'unknown');

  return isValidIp(ip) ? ip : 'unknown';
}

/**
 * Get the client IP address from NextAuth's internal authorize `req` object.
 */
export function getClientIpFromAuth(req: AuthRequest): string {
  const forwarded = req?.headers?.['x-forwarded-for'];
  const realIp = req?.headers?.['x-real-ip'];

  const ip =
    (typeof forwarded === 'string' && forwarded.split(',')[0].trim()) ||
    (typeof realIp === 'string' && realIp.trim()) ||
    (process.env.NODE_ENV !== 'production' ? '127.0.0.1' : 'unknown');

  return isValidIp(ip) ? ip : 'unknown';
}
