'use server';

import { revalidatePath } from 'next/cache';
import { handleServerActionError } from '../../helpers/errors/handleServerActionError';
import { getCurrentSession } from '../../helpers/security/getCurrentSession';
import { prisma } from '../../prisma';
import { interviewIdSchema } from '../../shemaServer/interview/interviewIdShema';

/**
 * Deletes an interview by its ID
 * @param {FormData} formData - The form data containing the interview ID
 * @returns {Promise<void>} A promise that resolves when the interview is deleted
 * @throws {Error} If the interview is not found, user is not authorized, or deletion fails
 */
export const deleteInterview = async (formData: FormData): Promise<void> => {
  const interviewId = formData.get('interviewId') as string;

  const validationResult = interviewIdSchema.safeParse({ interviewId });
  if (!validationResult.success) {
    throw handleServerActionError(
      400,
      validationResult.error.issues[0].message
    );
  }

  const validInterviewId = validationResult.data.interviewId;
  const session = await getCurrentSession();

  const interview = await prisma.interview.findUnique({
    where: { id: validInterviewId },
    include: {
      data: { select: { userId: true } },
    },
  });

  if (!interview) {
    throw handleServerActionError(404, 'Interview not found');
  }

  if (interview.data?.userId !== session.user.id) {
    throw handleServerActionError(
      403,
      'You are not authorized to delete this interview'
    );
  }

  try {
    await prisma.interview.delete({
      where: { id: interviewId },
    });
    revalidatePath('/interview');
  } catch (error) {
    throw handleServerActionError(500, 'Error deleting interview');
  }
};
