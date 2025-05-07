import { NextResponse } from 'next/server';
import { signupHandler } from '../../../../../lib/api/auth/signupHandler';
import { securityHeaders } from '../../../../../lib/helpers/security/securityHeaders';

/**
 * Signup handler for user registration
 * @returns The signup handler for POST requests
 */
export { signupHandler as POST };

/**
 * Handles OPTIONS preflight requests for CORS
 */
export function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: securityHeaders,
  });
}
