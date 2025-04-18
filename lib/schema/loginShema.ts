import { z } from 'zod';

/**
 * Login validation schema
 * @constant
 * @type {z.ZodObject}
 */
export const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'At least 8 characters'),
});
export type LoginSchemaType = z.infer<typeof LoginSchema>;
