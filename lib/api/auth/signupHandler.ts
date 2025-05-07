import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import { handleError } from '../../helpers/errors/handleError';
import { getClientIp } from '../../helpers/security/getClientIp';
import { securityHeaders } from '../../helpers/security/securityHeaders';
import { corsMiddleware } from '../../middleware/corsMiddleware';
import { rateLimitMiddleware } from '../../middleware/rateLimitMiddleware';
import { prisma } from '../../prisma';
import { signupSchema } from '../../shemaServer/auth/signupShema';

const saltRounds = 10;

interface PrismaClientKnownRequestError {
  code: string;
  meta?: {
    target?: string[];
  };
}

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
      key: getClientIp(request as NextRequest),
      limit: 3,
      ttl: 60000,
      scope: 'ip',
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

    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      return handleError(400, 'Email already in use');
    }

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
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';

    if (typeof error === 'object' && error !== null && 'code' in error) {
      const prismaError = error as PrismaClientKnownRequestError;

      if (
        prismaError.code === 'P2002' &&
        prismaError.meta?.target?.includes('email')
      ) {
        return handleError(400, 'Email already in use');
      }
    }
    console.error('signupHandler error:', { message });
    return handleError(500, 'Server error');
  }
}
