import { z } from 'zod';

/**
 * interview validation schema
 * @constant
 * @type {z.ZodObject}
 */
export const interviewSchema = z.object({
  position: z.string().min(1, 'Position is required'),
  difficulty: z.string().min(1, 'Difficulty is required'),
  interviewType: z.string().min(1, 'Interview type is required'),
  numberOfQuestions: z.string().min(1, 'Number of questions is required'),
  stack: z
    .array(z.string())
    .min(1, { message: 'Please select at least one stack' })
    .max(6, { message: 'You can select up to 6 stack only' }),
});

export type InterviewSchemaType = z.infer<typeof interviewSchema>;
