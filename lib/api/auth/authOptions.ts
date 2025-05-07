import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { compare } from 'bcryptjs';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { config } from '../../config';
import { getClientIpFromAuth } from '../../helpers/security/getClientIp';
import { rateLimitMiddleware } from '../../middleware/rateLimitMiddleware';
import { prisma } from '../../prisma';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    GoogleProvider({
      clientId: config.googleClientId!,
      clientSecret: config.googleClientSecret!,
    }),

    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const ip = getClientIpFromAuth(req);

        const limitResult = rateLimitMiddleware({
          key: ip,
          limit: 30,
          ttl: 60_000,
          scope: 'ip',
        });
        if (limitResult) {
          throw new Error(
            'Too many login attempts. Please wait and try again.'
          );
        }

        if (!credentials?.email || !credentials.password) {
          throw new Error('Email and password are required');
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: { credentials: true },
        });

        if (!user || !user.credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const isValid = await compare(
          credentials.password,
          user.credentials.password
        );

        if (!isValid) {
          throw new Error('Invalid credentials');
        }

        return user;
      },
    }),
  ],

  session: {
    strategy: 'jwt',
    maxAge: 60 * 60,
  },
  secret: config.secretKey,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },

  events: {
    async createUser({ user }) {
      try {
        await prisma.profile.create({
          data: {
            firstname: '',
            lastname: '',
            image: user.image ?? '',
            user: {
              connect: { id: user.id },
            },
          },
        });

        const account = await prisma.account.findFirst({
          where: { userId: user.id },
        });

        if (account?.provider === 'credentials') {
          await prisma.credential.create({
            data: {
              password: '',
              user: { connect: { id: user.id } },
            },
          });
        }
      } catch (error) {
        console.error('Error creating user extras:', error);
      }
    },
  },
};
