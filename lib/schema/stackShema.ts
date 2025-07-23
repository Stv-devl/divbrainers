import { TFunction } from 'i18next';
import { z } from 'zod';

/**
 * Schema for validating technical stack
 * @typedef {Object} StackSchema
 * @property {string[]} stack - Array of technical stack items with min 1 and max 6 elements
 */

export const getStackShema = (t: TFunction) =>
  z.object({
    stack: z
      .array(z.string())
      .min(1, { message: t('Quiz.form.errors.min') })
      .max(6, { message: t('Quiz.form.errors.max') }),
  });
