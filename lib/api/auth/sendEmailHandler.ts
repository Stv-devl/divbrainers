import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { handleError } from '../../helpers/errors/handleError';
import { sendResetEmail } from '../../helpers/fileOperations/sendRestEmail';
import { getClientIp } from '../../helpers/security/getClientIp';
import { corsMiddleware } from '../../middleware/corsMiddleware';
import { rateLimitMiddleware } from '../../middleware/rateLimitMiddleware';
import { prisma } from '../../prisma';
import { sendEmailSchema } from '../../shemaServer/auth/sendEmailShema';

/**
 * Send email handler for user registration
 * @returns The send email handler for POST requests
 */
export async function sendEmailHandler(req: Request) {
  try {
    const corsResponse = corsMiddleware(req);
    if (corsResponse) return corsResponse;

    const rateLimitResponse = rateLimitMiddleware({
      key: getClientIp(req),
      limit: 3,
      ttl: 60_000,
      scope: 'ip',
    });
    if (rateLimitResponse) return rateLimitResponse;

    const body = await req.json();
    const parsed = sendEmailSchema.safeParse(body.email);
    if (!parsed.success) {
      return handleError(
        400,
        parsed.error.issues[0]?.message || 'Invalid input data'
      );
    }

    const normalizedEmail = parsed.data.trim().toLowerCase();

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      return handleError(200, 'An error occurred, please try again.');
    }

    await prisma.verificationToken.deleteMany({
      where: { identifier: normalizedEmail },
    });

    const rawToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = await bcrypt.hash(rawToken, 10);
    const expires = new Date(Date.now() + 30 * 60 * 1000);

    await prisma.verificationToken.create({
      data: {
        identifier: normalizedEmail,
        token: hashedToken,
        expires,
      },
    });

    const resetLink = `${process.env.NEXT_PUBLIC_ORIGIN}/newpassword?token=${rawToken}&email=${normalizedEmail}`;

    try {
      await sendResetEmail(normalizedEmail, resetLink);
    } catch (emailError) {
      const message =
        emailError instanceof Error ? emailError.message : 'Unknown error';
      console.error('Failed to send reset email:', { message });
      return handleError(500, 'Failed to send reset email.');
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Reset email handler error:', { message });
    return handleError(500, 'Server error');
  }
}
