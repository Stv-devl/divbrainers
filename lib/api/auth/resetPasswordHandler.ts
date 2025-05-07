import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import { handleError } from '../../helpers/errors/handleError';
import { getClientIp } from '../../helpers/security/getClientIp';
import { corsMiddleware } from '../../middleware/corsMiddleware';
import { rateLimitMiddleware } from '../../middleware/rateLimitMiddleware';
import { prisma } from '../../prisma';
import { resetPasswordSchema } from '../../shemaServer/interview/resetPasswordShema';

export async function resetPasswordHandler(req: Request) {
  try {
    const corsResponse = corsMiddleware(req);
    if (corsResponse) return corsResponse;

    const rateLimitResponse = await rateLimitMiddleware({
      key: getClientIp(req as NextRequest),
      limit: 3,
      ttl: 60_000,
      scope: 'ip',
    });
    if (rateLimitResponse) return rateLimitResponse;

    const body = await req.json();
    const parsed = resetPasswordSchema.safeParse(body);
    if (!parsed.success) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Zod validation error:', parsed.error.format());
      }
      return handleError(
        400,
        parsed.error.issues[0]?.message || 'Invalid input data'
      );
    }

    const { email, token, password } = parsed.data;
    const normalizedEmail = email.trim().toLowerCase();

    const tokenRecord = await prisma.verificationToken.findFirst({
      where: { identifier: normalizedEmail },
    });

    const now = new Date();

    const isTokenValid =
      tokenRecord &&
      tokenRecord.expires > now &&
      (await bcrypt.compare(token, tokenRecord.token));

    if (!isTokenValid) {
      return handleError(400, 'Invalid or expired link.');
    }

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      return handleError(400, 'Invalid or expired link.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.credential.update({
      where: { userId: user.id },
      data: { password: hashedPassword },
    });

    await prisma.verificationToken.delete({
      where: { id: tokenRecord.id },
    });

    return NextResponse.json(
      { ok: true, message: 'Updated password' },
      { status: 200 }
    );
  } catch (err) {
    console.error('Reset password error:', err);
    return handleError(500, 'Server error.');
  }
}
