import type { NextRequest } from 'next/server';

type AuthRequest = {
  headers?: Record<string, string | string[] | undefined>;
};

function isValidIp(ip: string): boolean {
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  const ipv6Regex = /^([a-fA-F0-9]{0,4}:){2,7}[a-fA-F0-9]{0,4}$/;
  const isLocal = ip === '127.0.0.1' || ip === '::1';

  return ipv4Regex.test(ip) || ipv6Regex.test(ip) || isLocal;
}

/**
 * Get the client IP address from a standard `NextRequest` object.
 */
export function getClientIp(req: NextRequest): string {
  const xff = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');

  const rawIp =
    xff?.split(',')[0]?.trim() ||
    realIp?.trim() ||
    (process.env.NODE_ENV !== 'production' ? '127.0.0.1' : '');

  return isValidIp(rawIp) ? rawIp : '127.0.0.1';
}
/**
 * Get the client IP address from NextAuth's internal authorize `req` object.
 */
export function getClientIpFromAuth(req: AuthRequest): string {
  const forwarded = req?.headers?.['x-forwarded-for'];
  const realIp = req?.headers?.['x-real-ip'];

  const rawIp =
    (typeof forwarded === 'string' && forwarded.split(',')[0].trim()) ||
    (typeof realIp === 'string' && realIp.trim()) ||
    (process.env.NODE_ENV !== 'production' ? '127.0.0.1' : '');

  return isValidIp(rawIp) ? rawIp : '127.0.0.1';
}
