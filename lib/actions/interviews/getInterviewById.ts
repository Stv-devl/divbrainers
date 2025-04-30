'use server';

import { getUserData } from '../../data/getUserData';
import { getCurrentSession } from '../../helpers/security/getCurrentSession';
import { prisma } from '../../prisma';

export async function getInterviewById(id: string) {
  const session = await getCurrentSession();
  const userData = await getUserData(session.user.id);

  if (!userData) {
    return null;
  }

  const interview = await prisma.interview.findFirst({
    where: {
      id,
      dataId: userData.id,
    },
  });

  return interview;
}
