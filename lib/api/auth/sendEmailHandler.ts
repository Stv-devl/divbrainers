import { NextResponse } from 'next/server';
import { prisma } from '../../prisma';
import { sendResetEmail } from '../../utils/fileOperations/sendRestEmail';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { rateLimitMiddleware } from '../middleware/rateLimitMiddleware';
import { corsMiddleware } from '../middleware/corsMiddleware';
import { sendEmailSchema } from '../../shema/sendEmailShema';
import { handleError } from '../../utils/errors/handleError';

/**
 * Send email handler for user registration
 * @returns The send email handler for POST requests
 */
export async function sendEmailHandler(req: Request) {
  try {
    const corsResponse = corsMiddleware(req);
    if (corsResponse) return corsResponse;

    const rateLimitResponse = await rateLimitMiddleware({
      limit: 3,
      ttl: 60000,
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
      return handleError(200, 'If an account exists, an email has been sent.');
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

    await sendResetEmail(normalizedEmail, resetLink);

    return NextResponse.json({ message: 'Email sent' }, { status: 200 });
  } catch (err) {
    console.error('send email', err);
    return handleError(500, 'Server error');
  }
}
