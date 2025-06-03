import { z } from 'zod';

/**
 * quiz validation schema
 * @constant
 * @type {z.ZodObject}
 */
export const quizFormSchema = z.object({
  difficulty: z.string().min(1, 'Difficulty is required'),
});

export type QuizFormSchemaType = z.infer<typeof quizFormSchema>;
