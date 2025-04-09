import { z } from 'zod';

/**
 * Signup validation schema
 * @constant
 * @type {z.ZodObject}
 */
export const signupValidationSchema = z
  .object({
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Invalid email address'),
    password: z.string().min(8, 'At least 8 characters'),
    repeat: z.string(),
  })
  .refine((data) => data.password === data.repeat, {
    message: 'Passwords do not match',
    path: ['repeat'],
  });

export type SignupSchemaType = z.infer<typeof signupValidationSchema>;
