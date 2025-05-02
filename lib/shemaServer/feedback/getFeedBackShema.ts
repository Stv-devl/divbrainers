import { z } from 'zod';

/**
 * Schema for validating the feedback ID
 */
export const getFeedBackSchema = z.object({
  feedbackId: z
    .string()
    .cuid({ message: 'Invalid feedback ID format (expected CUID)' }),
});
export type GetFeedBackSchemaType = z.infer<typeof getFeedBackSchema>;
