import { TFunction } from 'i18next';
import { z } from 'zod';

/**
 * Base shape (non validée) — pour typing statique
 */
export const SignupSchemaShape = {
  email: z.string(),
  password: z.string(),
  repeat: z.string(),
};

export type SignupSchemaType = z.infer<z.ZodObject<typeof SignupSchemaShape>>;

/**
 * Schéma Zod avec traductions dynamiques
 */
export const getSignupSchema = (t: TFunction) =>
  z
    .object({
      email: z
        .string({
          required_error: t('signup.form.errors.email.required'),
          invalid_type_error: t('signup.form.errors.email.invalid'),
        })
        .min(1, t('signup.form.errors.email.required'))
        .email(t('signup.form.errors.email.invalid')),
      password: z
        .string({
          required_error: t('signup.form.errors.password.required'),
          invalid_type_error: t('signup.form.errors.password.required'),
        })
        .min(8, t('signup.form.errors.password.min')),
      repeat: z
        .string({
          required_error: t('signup.form.errors.repeat.required'),
        })
        .min(1, t('signup.form.errors.repeat.required')),
    })
    .refine((data) => data.password === data.repeat, {
      message: t('signup.form.errors.repeat.mismatch'),
      path: ['repeat'],
    });
