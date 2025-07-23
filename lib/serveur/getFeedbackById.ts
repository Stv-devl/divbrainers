import { handleServerActionError } from '../helpers/errors/handleServerActionError';
import { getCurrentSession } from '../helpers/security/getCurrentSession';
import { prisma } from '../prisma';
import { getFeedBackSchema } from '../shemaServer/feedback/getFeedBackShema';

/**
 * Retrieves a feedback by its ID for the current user
 * @param {string} id - The ID of the feedback to retrieve
 * @returns {Promise<object>} The feedback object if found
 * @throws {Error} If the feedback is not found or user is not authorized
 */
export async function getFeedbackById(id: string) {
  const session = await getCurrentSession();

  const validationResult = getFeedBackSchema.safeParse({
    feedbackId: id,
  });

  if (!validationResult.success) {
    throw handleServerActionError(400, 'Invalid feedback ID');
  }

  const feedback = await prisma.feedback.findFirst({
    where: {
      id: validationResult.data.feedbackId,
      userId: session.user.id,
    },
  });

  if (!feedback) {
    throw handleServerActionError(404, 'Feedback not found');
  }
  return feedback;
}
