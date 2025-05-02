import { z } from 'zod';

/**
 * Schema for the reset password form
 */
export const resetPasswordSchema = z.object({
  email: z.string().email('Invalid email format'),
  token: z.string(),
  password: z.string().min(4, 'At least 4 characters'),
});

export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;
