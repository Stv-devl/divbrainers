import { z } from 'zod';

/**
 * quiz validation schema
 * @constant
 * @type {z.ZodObject}
 */
export const quizSchema = z.object({
  difficulty: z.string().min(1, 'Difficulty is required'),
  stack: z
    .array(z.string().min(1, 'Stack value cannot be empty'))
    .min(1, { message: 'Please select at least one stack' })
    .max(6, { message: 'You can select up to 6 stack only' }),
});

export type QuizSchemaType = z.infer<typeof quizSchema>;
