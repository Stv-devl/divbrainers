import { z } from 'zod';

export const scanSchema = z.object({
  resumeFile: z
    .instanceof(File, { message: 'Please upload your resume file' })
    .refine((file) => file.type === 'application/pdf', {
      message: 'The file must be a PDF',
    })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: 'The file must not exceed 5MB',
    }),
  keywords: z
    .array(z.string())
    .min(1, { message: 'Please validate the job offer before submitting' }),
  formatedJobOffer: z
    .string()
    .min(20, { message: 'Please validate the job offer before submitting' }),
});
