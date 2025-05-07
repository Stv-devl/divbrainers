import { prisma } from '../../prisma';

/**
 * Retrieves user data from the database
 * @param userId - The ID of the user to retrieve data for
 * @returns The user data or null if not found
 */
export async function getUserData(userId: string) {
  const userData = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
    },
  });

  return userData;
}
