import { TFunction } from 'i18next';
import { z } from 'zod';

/**
 * Creates a zod schema for interview validation using translation function `t`
 */
export const interviewSchema = (t: TFunction) =>
  z.object({
    position: z.string().min(1, t('interview.form.errors.position')),
    difficulty: z.string().min(1, t('interview.form.errors.difficulty')),
    interviewType: z.string().min(1, t('interview.form.errors.interviewType')),
    numberOfQuestions: z
      .string()
      .min(1, t('interview.form.errors.numberOfQuestions')),
  });

export type InterviewSchemaType = z.infer<ReturnType<typeof interviewSchema>>;
