import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { config } from '../../config';
import { prisma } from '../../prisma';
import { compare } from 'bcryptjs';

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
      async authorize(credentials) {
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
            id: user.id,
            firstname: '',
            lastname: '',
            image: user.image ?? '',
          },
        });

        if (!user.email?.includes('@gmail.com')) {
          await prisma.credential.create({
            data: {
              id: user.id,
              password: '',
            },
          });
        }
      } catch (error) {
        console.error('Error creating user extras:', error);
      }
    },
  },
};
