import React, { useState } from 'react';
import { z } from 'zod';
import Button from '@/components/ui/buttons/Button';
import AddJobOffer from './AddJobOffer';
import AddYourResume from './AddYourResume';

const ScanForm = () => {
  const [error, setError] = useState<{ resume?: string; jobOffer?: string }>(
    {}
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [isJobOfferValid, setIsJobOfferValid] = useState<boolean>(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const scanSchema = z.object({
    resumeFile: z
      .instanceof(File, { message: 'Please upload your resume file' })
      .refine((file) => file.type === 'application/pdf', {
        message: 'The file must be a PDF',
      })
      .refine((file) => file.size <= 5 * 1024 * 1024, {
        message: 'The file must not exceed 5MB',
      }),
    isJobOfferValid: z.literal(true, {
      errorMap: () => ({
        message: 'Please validate the job offer before submitting',
      }),
    }),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError({});

    const result = scanSchema.safeParse({ resumeFile, isJobOfferValid });
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setError({
        resume: fieldErrors.resumeFile?.[0],
        jobOffer: fieldErrors.isJobOfferValid?.[0],
      });
      return;
    }
    setLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 1500));
      console.log('Sending data to backend...');
    } catch (err) {
      console.error('An error occurred:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-10 items-center size-full"
    >
      <AddJobOffer
        onValidateChange={setIsJobOfferValid}
        error={error}
        setError={setError}
      />
      <AddYourResume onFileChange={setResumeFile} error={error} />
      <div className="w-44 h-10">
        <Button
          label="Send your resume"
          type="submit"
          color="filled"
          isLoading={loading}
          disabled={loading}
        />
      </div>
    </form>
  );
};

export default ScanForm;
