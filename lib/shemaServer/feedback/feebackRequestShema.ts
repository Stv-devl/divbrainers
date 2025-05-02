import { z } from 'zod';

export const feedbackRequestSchema = z.object({
  interviewId: z.string().min(10),
  transcript: z.array(
    z.object({
      role: z.enum(['user', 'assistant']),
      content: z.string().min(1),
    })
  ),
  feedbackId: z.string().optional(),
});

export type FeedbackRequestSchemaType = z.infer<typeof feedbackRequestSchema>;
