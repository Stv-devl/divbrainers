import { z } from 'zod';

/**
 * Send link validation schema
 * @constant
 * @type {z.ZodObject}
 */
export const sendLinkSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
});

export type SendLinkSchemaType = z.infer<typeof sendLinkSchema>;
