import { getUserData } from '../helpers/data/getUserData';
import { handleServerActionError } from '../helpers/errors/handleServerActionError';
import { getCurrentSession } from '../helpers/security/getCurrentSession';
import { prisma } from '../prisma';
import { interviewIdSchema } from '../shemaServer/interview/interviewIdShema';

/**
 * Retrieves an interview by its ID for the current user
 * @param {string} id - The ID of the interview to retrieve
 * @returns {Promise<object>} The interview object if found
 * @throws {Error} If the interview is not found or user is not authorized
 */
export async function getInterviewById(id: string) {
  const session = await getCurrentSession();

  const validationResult = interviewIdSchema.safeParse({ interviewId: id });
  if (!validationResult.success) {
    throw handleServerActionError(
      400,
      validationResult.error.issues[0].message
    );
  }

  const validInterviewId = validationResult.data.interviewId;

  const userData = await getUserData(session.user.id);
  if (!userData) {
    throw handleServerActionError(404, 'User data not found');
  }

  const interview = await prisma.interview.findFirst({
    where: {
      id: validInterviewId,
      userId: userData.id,
    },
    include: {
      feedbacks: true,
    },
  });

  if (!interview) {
    throw handleServerActionError(404, 'Interview not found');
  }

  return interview;
}
