import { z } from 'zod';

/**
 * Schema for validating technical stack
 * @typedef {Object} StackSchema
 * @property {string[]} stack - Array of technical stack items with min 1 and max 6 elements
 */

export const stackShema = z.object({
  stack: z
    .array(z.string())
    .min(1, { message: 'Please select at least one stack' })
    .max(6, { message: 'You can select up to 6 stack only' }),
});

export type SignupSchemaType = z.infer<typeof stackShema>;
