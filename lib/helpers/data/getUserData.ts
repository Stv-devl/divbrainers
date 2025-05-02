import { prisma } from '../../prisma';

/**
 * Retrieves user data from the database
 * @param userId - The ID of the user to retrieve data for
 * @returns The user data or null if not found
 */
export async function getUserData(userId: string) {
  const userData = await prisma.data.findUnique({
    where: {
      userId,
    },
    select: {
      id: true,
    },
  });

  return userData;
}
