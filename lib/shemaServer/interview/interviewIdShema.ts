import { z } from 'zod';

/**
 * Schema for validating the interview ID
 */
export const interviewIdSchema = z.object({
  interviewId: z
    .string()
    .cuid({ message: 'Invalid interview ID format (expected CUID)' }),
});
