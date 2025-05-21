import { z } from 'zod';

export const jobOfferSchema = z.object({
  jobOffer: z
    .string({
      required_error: 'The job offer cannot be empty',
      invalid_type_error: 'The job offer must be text',
    })
    .min(20, 'The job offer must contain at least 20 characters')
    .max(8000, 'The job offer must not exceed 8000 characters'),
});

export type jobOfferSchemaType = z.infer<typeof jobOfferSchema>;
