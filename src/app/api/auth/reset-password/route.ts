import { NextResponse } from 'next/server';
import { resetPasswordHandler } from '../../../../../lib/api/auth/resetPasswordHandler';
import { securityHeaders } from '../../../../../lib/helpers/security/securityHeaders';

/**
 * Reset password handler for user registration
 * @returns The reset password handler for POST requests
 */
export { resetPasswordHandler as POST };

/**
 * Handles OPTIONS preflight requests for CORS
 */
export function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: securityHeaders,
  });
}
