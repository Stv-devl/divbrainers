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
  stack: z.string().min(1, 'Stack is required'),
});

export type InterviewSchemaType = z.infer<typeof interviewSchema>;
