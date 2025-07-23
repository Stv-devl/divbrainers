import { TFunction } from 'i18next';
import { z } from 'zod';

export const SendLinkSchemaShape = {
  email: z.string(),
};

export type SendLinkSchemaType = z.infer<
  z.ZodObject<typeof SendLinkSchemaShape>
>;

export const getSendLinkSchema = (t: TFunction) =>
  z.object({
    email: z
      .string({
        required_error: t('sendLink.form.errors.email.required'),
        invalid_type_error: t('sendLink.form.errors.email.invalid'),
      })
      .min(1, t('sendLink.form.errors.email.required'))
      .email(t('sendLink.form.errors.email.invalid')),
  });
