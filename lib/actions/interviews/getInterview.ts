'use server';

import { getUserData } from '../../helpers/data/getUserData';
import { handleServerActionError } from '../../helpers/errors/handleServerActionError';
import { getCurrentSession } from '../../helpers/security/getCurrentSession';
import { prisma } from '../../prisma';

/**
 * Retrieves all interviews for the authenticated user
 * @returns An array of interview objects ordered by creation date (newest first)
 * or an empty array if the user has no data record
 */
export async function getInterview() {
  const session = await getCurrentSession();
  const userData = await getUserData(session.user.id);

  if (!userData) {
    return [];
  }

  const interviews = await prisma.interview.findMany({
    where: {
      dataId: userData.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      feedback: true,
    },
  });

  if (!interviews) {
    throw handleServerActionError(404, 'Interview not found');
  }

  return interviews;
}
