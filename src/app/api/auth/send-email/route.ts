import { NextResponse } from 'next/server';
import { sendEmailHandler } from '../../../../../lib/api/auth/sendEmailHandler';
import { securityHeaders } from '../../../../../lib/helpers/security/securityHeaders';

/**
 * Send email handler for user registration
 * @returns The send email handler for POST requests
 */
export { sendEmailHandler as POST };

/**
 * Handles OPTIONS preflight requests for CORS
 */
export function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: securityHeaders,
  });
}
