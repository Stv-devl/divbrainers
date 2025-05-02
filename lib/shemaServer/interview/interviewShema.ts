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
  numberOfQuestions: z.coerce
    .number({
      required_error: 'Number of questions is required',
      invalid_type_error: 'Number of questions must be a number',
    })
    .int('Must be an integer')
    .min(1, 'Must be at least 1')
    .max(10, 'Maximum 10 questions'),
  stack: z
    .array(z.string().min(1, 'Stack value cannot be empty'))
    .min(1, { message: 'Please select at least one stack' })
    .max(6, { message: 'You can select up to 6 stack only' }),
});

export type InterviewSchemaType = z.infer<typeof interviewSchema>;
