import { z } from 'zod';

/**
 * Schema for validating send email operations
 * @typedef {Object} SendEmailSchema
 * @property {string} email - The email of the user
 */

export const sendEmailSchema = z
  .string()
  .min(5, 'Email too short')
  .max(100, 'Email too long')
  .email('Invalid email');

export type SendEmailSchemaType = z.infer<typeof sendEmailSchema>;
