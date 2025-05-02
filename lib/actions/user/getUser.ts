'use server';

import { UserProfile } from '../../../src/types/type';
import { getCurrentSession } from '../../helpers/security/getCurrentSession';
import { prisma } from '../../prisma';

/**
 * Retrieves user profile information
 * @returns {Promise<UserProfile>} The user profile
 * @throws {Error} If the user is not found or an error occurs
 */
export const getUser = async (): Promise<UserProfile> => {
  const session = await getCurrentSession();

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

  return {
    _id: user?.id ?? '',
    name: user?.name ?? '',
    email: user?.email ?? '',
    image: user?.image ?? null,
    imagePublicId: user?.imagePublicId ?? null,
  };
};
