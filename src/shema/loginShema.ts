import { z } from 'zod';

/**
 * Login validation schema
 * @constant
 * @type {z.ZodObject}
 */
export const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(4, 'Password must be at least 4 characters'),
});
export type LoginSchemaType = z.infer<typeof LoginSchema>;
