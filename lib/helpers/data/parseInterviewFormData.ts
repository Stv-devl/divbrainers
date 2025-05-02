import { interviewSchema } from '../../shemaServer/interview/interviewShema';
import { InterviewSchemaType } from '../../shemaServer/interview/interviewShema';
import { handleServerActionError } from '../errors/handleServerActionError';

/**
 * Parses interview form data from a FormData object
 * @param formData - The FormData object containing interview form data
 * @returns The parsed interview data
 */
export const parseInterviewFormData = (
  formData: FormData
): InterviewSchemaType => {
  const raw: Partial<InterviewSchemaType> = {
    position: formData.get('position') as string,
    difficulty: formData.get('difficulty') as string,
    interviewType: formData.get('interviewType') as string,
    numberOfQuestions: Number(formData.get('numberOfQuestions')),
  };

  const stackRaw = formData.get('stack') as string;

  try {
    raw.stack = JSON.parse(stackRaw);
  } catch {
    throw handleServerActionError(
      400,
      'Stack format is invalid. Must be a valid JSON array.'
    );
  }

  const parsed = interviewSchema.safeParse(raw);
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message || 'Invalid input data';
    throw handleServerActionError(400, message);
  }

  return parsed.data;
};
