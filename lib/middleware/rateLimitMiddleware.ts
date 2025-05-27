import { LRUCache } from 'lru-cache';
import { handleError } from '../helpers/errors/handleError';
import { isValidClientIp } from '../helpers/security/isValidClientIp';

export interface RateLimitOptions {
  key: string;
  limit: number;
  ttl: number;
  scope?: 'ip' | 'user';
}

const ipCache = new LRUCache<string, number>({ max: 500, ttl: 60_000 });
const userCache = new LRUCache<string, number>({ max: 500, ttl: 60_000 });

/**
 * Middleware to limit the number of requests
 * @param options - Configuration options for rate limiting
 * @returns null if the request is allowed, a 429 error if it is rejected
 */
export function rateLimitMiddleware(options: RateLimitOptions) {
  const { key, limit, ttl, scope = 'ip' } = options;

  if (scope === 'ip') {
    const isValid = isValidClientIp(key);

    if (!isValid) {
      console.warn('Blocked request due to invalid IP:', key);
      return handleError(400, 'Invalid client IP.');
    }
  }

  const cache = scope === 'user' ? userCache : ipCache;
  const currentCount = cache.get(key) ?? 0;

  if (currentCount >= limit) {
    return handleError(429, 'Too many requests. Please try again later.');
  }

  cache.set(key, currentCount + 1, { ttl });
  return null;
}
