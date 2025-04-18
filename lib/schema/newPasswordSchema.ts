import { z } from 'zod';

/**
 * New password validation schema
 * @constant
 * @type {z.ZodObject}
 */
export const newPasswordSchema = z
  .object({
    password: z.string().min(4, 'At least 4 characters'),
    repeat: z.string().min(1, 'Password is required'),
  })
  .refine((data) => data.password === data.repeat, {
    message: 'Passwords must match',
    path: ['repeat'],
  });

export type NewPasswordSchemaType = z.infer<typeof newPasswordSchema>;
