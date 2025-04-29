'use server';

import { revalidatePath } from 'next/cache';
import { getUserData } from '../../data/getUserData';
import { getCurrentSession } from '../../helpers/security/getCurrentSession';
import { prisma } from '../../prisma';

export async function deleteInterview(formData: FormData): Promise<void> {
  const interviewId = formData.get('interviewId') as string;

  if (!interviewId) {
    console.error('InterviewId not provided.');
    return;
  }

  const session = await getCurrentSession();
  const userData = await getUserData(session.user.id);

  if (!userData) {
    console.error('UserData not found.');
    return;
  }

  try {
    await prisma.interview.delete({
      where: {
        id: interviewId,
        dataId: userData.id,
      },
    });
    console.log('Interview deleted successfully.');
  } catch (error) {
    console.error('Error deleting interview:', error);
  }
  revalidatePath('/interview');
}
