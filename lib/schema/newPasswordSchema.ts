import { TFunction } from 'i18next';
import { z } from 'zod';

export const NewPasswordSchemaShape = {
  password: z.string(),
  repeat: z.string(),
};

export type NewPasswordSchemaType = z.infer<
  z.ZodObject<typeof NewPasswordSchemaShape>
>;

export const getNewPasswordSchema = (t: TFunction) =>
  z
    .object({
      password: z
        .string({
          required_error: t('resetPassword.form.errors.password.required'),
          invalid_type_error: t('resetPassword.form.errors.password.required'),
        })
        .min(4, t('resetPassword.form.errors.password.min')),
      repeat: z
        .string({
          required_error: t('resetPassword.form.errors.repeat.required'),
        })
        .min(1, t('resetPassword.form.errors.repeat.required')),
    })
    .refine((data) => data.password === data.repeat, {
      message: t('resetPassword.form.errors.repeat.mismatch'),
      path: ['repeat'],
    });
