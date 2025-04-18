'use server';

import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { UserProfile } from '../../src/types/type';
import { authOptions } from '../api/auth/authOptions';
import { prisma } from '../prisma';

export const getUser = async (): Promise<UserProfile> => {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      imagePublicId: true,
    },
  });

  if (!user) redirect('/login');

  return {
    _id: user.id,
    name: user.name ?? '',
    email: user.email,
    image: user.image ?? null,
    imagePublicId: user.imagePublicId ?? null,
  };
};
