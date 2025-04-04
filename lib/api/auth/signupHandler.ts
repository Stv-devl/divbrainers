import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { corsMiddleware } from '../middleware/corsMiddleware';
import { rateLimitMiddleware } from '../middleware/rateLimitMiddleware';
import { signupSchema } from '../../shema/signupShema';
import { handleError } from '../../utils/errors/handleError';
import { securityHeaders } from '../../utils/security/securityHeaders';
import { prisma } from '../../prisma';

const saltRounds = 10;

/**
 * Handles user signup requests
 * @param request - The HTTP request object
 * @returns A NextResponse object with the result of the signup operation
 */

export async function signupHandler(request: Request): Promise<NextResponse> {
  try {
    const corsResponse = corsMiddleware(request);
    if (corsResponse) return corsResponse;

    const rateLimitResponse = await rateLimitMiddleware({
      limit: 3,
      ttl: 60000,
    });
    if (rateLimitResponse) return rateLimitResponse;

    const body = await request.json();
    const parsed = signupSchema.safeParse(body);

    if (!parsed.success) {
      return handleError(
        400,
        parsed.error.issues[0]?.message || 'Invalid input data'
      );
    }

    const { email, password } = parsed.data;
    const normalizedEmail = email.trim().toLowerCase();
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await prisma.user.create({
      data: {
        email: normalizedEmail,
        credentials: {
          create: {
            password: hashedPassword,
          },
        },
        profile: {
          create: {
            firstname: '',
            lastname: '',
            image: '',
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: 'User created successfully',
        userId: newUser.id,
      },
      { status: 201, headers: securityHeaders }
    );
  } catch (error: any) {
    if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
      return handleError(400, 'Email already in use');
    }

    console.error('signupHandler Internal server error:', error);
    return handleError(500, 'Server error');
  }
}
