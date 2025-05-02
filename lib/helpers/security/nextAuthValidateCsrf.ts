import { cookies } from 'next/headers';

/**
 * Validates the CSRF token for a request
 * @param request - The request object
 * @returns True if the CSRF token is valid, false otherwise
 */
export async function nextAuthValidateCsrf(request: Request): Promise<boolean> {
  const csrfHeader = request.headers.get('X-CSRF-Token');

  if (!csrfHeader) {
    return false;
  }
  const tokenCookie =
    (await cookies()).get('next-auth.csrf-token')?.value || '';

  if (!tokenCookie) {
    return false;
  }

  const [cookieCsrf] = tokenCookie.split('|');

  const isValid = cookieCsrf === csrfHeader;

  return isValid;
}
