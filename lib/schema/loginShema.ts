import { TFunction } from 'i18next';
import { z } from 'zod';

export const LoginSchemaShape = {
  email: z.string(),
  password: z.string(),
};

export type LoginSchemaType = z.infer<z.ZodObject<typeof LoginSchemaShape>>;

export const getLoginSchema = (t: TFunction) =>
  z.object({
    email: z
      .string({
        required_error: t('login.form.errors.email.required'),
        invalid_type_error: t('login.form.errors.email.invalid'),
      })
      .email(t('login.form.errors.email.invalid')),
    password: z
      .string({
        required_error: t('login.form.errors.password.required'),
        invalid_type_error: t('login.form.errors.password.invalid'),
      })
      .min(8, t('login.form.errors.password.min')),
  });
