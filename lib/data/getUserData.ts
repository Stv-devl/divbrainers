import { prisma } from '../prisma';

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
