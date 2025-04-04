import { handleError } from '../../utils/errors/handleError';
import { prisma } from '../../prisma';
import { corsMiddleware } from '../middleware/corsMiddleware';
import { rateLimitMiddleware } from '../middleware/rateLimitMiddleware';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { resetPasswordSchema } from '../../shema/resetPasswordShema';

export async function resetPasswordHandler(req: Request) {
  try {
    const corsResponse = corsMiddleware(req);
    if (corsResponse) return corsResponse;

    const rateLimitResponse = await rateLimitMiddleware({
      limit: 3,
      ttl: 60000,
    });
    if (rateLimitResponse) return rateLimitResponse;

    const body = await req.json();

    const parsed = resetPasswordSchema.safeParse(body);
    if (!parsed.success) {
      return handleError(
        400,
        parsed.error.issues[0]?.message || 'Invalid input data'
      );
    }

    const { email, token, password } = parsed.data;

    const normalizedEmail = email.trim().toLowerCase();
    const tokenRecord = await prisma.verificationToken.findFirst({
      where: {
        identifier: normalizedEmail,
      },
    });

    if (!tokenRecord) {
      return handleError(400, 'Invalid or expired link.');
    }

    const now = new Date();
    if (tokenRecord.expires < now) {
      return handleError(400, 'Link has expired.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      return handleError(404, 'Utilisateur introuvable.');
    }

    await prisma.credential.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    await prisma.verificationToken.deleteMany({
      where: {
        identifier: normalizedEmail,
      },
    });

    return NextResponse.json(
      { ok: true, message: 'Updated password' },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return handleError(500, 'Server error.');
  }
}
