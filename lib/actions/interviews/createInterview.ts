'use server';

import { revalidatePath } from 'next/cache';
import { handleServerActionError } from '../../helpers/errors/handleServerActionError';
import { getCurrentSession } from '../../helpers/security/getCurrentSession';
import { prisma } from '../../prisma';
import { interviewSchema } from '../../shemaServer/interviewShema';

/**
 * Add a new user interview
 * @param formData - The form data containing interview details
 * @returns The newly created interview
 */
export async function createInterview(formData: FormData) {
  const session = await getCurrentSession();

  const position = formData.get('position') as string;
  const difficulty = formData.get('difficulty') as string;
  const interviewType = formData.get('interviewType') as string;
  const numberOfQuestions = formData.get('numberOfQuestions') as string;
  const stackRaw = formData.get('stack') as string;
  const stack = JSON.parse(stackRaw) as string[];

  const validationResult = interviewSchema.safeParse({
    position,
    difficulty,
    interviewType,
    numberOfQuestions,
    stack,
  });

  if (!validationResult.success) {
    handleServerActionError(
      400,
      validationResult.error.issues[0]?.message || 'Invalid input data'
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { dataId: true },
  });

  if (!user?.dataId) {
    throw handleServerActionError(404, 'User data not found');
  }

  const newInterview = await prisma.interview.create({
    data: {
      dataId: user.dataId,
      position,
      difficulty,
      interviewType,
      numberOfQuestions: parseInt(numberOfQuestions),
      stack,
      score: null,
    },
  });

  revalidatePath('/interview');

  return newInterview;
}
