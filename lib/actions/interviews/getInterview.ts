'use server';

import { getUserData } from '../../data/getUserData';
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
    select: {
      id: true,
      position: true,
      difficulty: true,
      interviewType: true,
      numberOfQuestions: true,
      stack: true,
      createdAt: true,
    },
  });

  return interviews;
}
