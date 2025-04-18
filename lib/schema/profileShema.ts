import { z } from 'zod';

/**
 * Schema for the profile form
 */
export const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format').min(1, 'Email is required'),
  image: z.unknown().optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
