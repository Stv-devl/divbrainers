import { z } from 'zod';

export const CreateQuizSchema = z.object({
  difficulty: z
    .string()
    .min(1, 'Difficulty is required')
    .refine((val) => ['junior', 'mid-level', 'senior'].includes(val), {
      message: 'Invalid difficulty level',
    }),
  stack: z.array(z.string().min(1)).min(1, 'At least one stack is required'),
});

export type CreateQuiProps = z.infer<typeof CreateQuizSchema>;
