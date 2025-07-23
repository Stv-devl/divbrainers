'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Loading from '@/components/loading/Loading';
import Button from '@/components/ui/buttons/Button';
import { useClientTranslation } from '@/hooks/i18n/useClientTranslation';
import postResume from '@/service/scan/postResume';
import { FormError } from '@/types/type';
import { scanSchema } from '../../../../lib/shemaServer/scanShema';
import AddJobOffer from './AddJobOffer';
import AddYourResume from './AddYourResume';

/**
 * Form component for submitting a resume for ATS scanning
 * @component
 * @returns {JSX.Element} The rendered scan form
 */
const ScanForm = () => {
  const [error, setError] = useState<FormError>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [analizeJobOffer, setAnalizeJobOffer] = useState('');

  const router = useRouter();
  const { t, isClient } = useClientTranslation();
  /**
   * Handles form submission, validates input, and processes the resume
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError({});

    const result = scanSchema.safeParse({
      resumeFile,
      keywords,
      analizeJobOffer,
    });

    if (!result.success) {
      const { resumeFile, analizeJobOffer } =
        result.error.flatten().fieldErrors;
      setError({
        resume: resumeFile?.[0],
        analizeJobOffer: analizeJobOffer?.[0],
      });
      return;
    }
    setLoading(true);
    try {
      if (!resumeFile) {
        setLoading(false);
        return;
      }

      const response = await postResume(resumeFile, keywords, analizeJobOffer);

      if (!response.success) {
        setError({ resume: response.message });
        setLoading(false);
        return;
      }
      sessionStorage.setItem('feedback', JSON.stringify(response.feedback));
      router.push('scan/feedback');
    } catch (err) {
      console.error(err);
      setError({ resume: 'An unexpected error occurred.' });
      setLoading(false);
    }
  };

  if (!isClient) return null;

  return (
    <div className="relative w-full flex flex-col items-center">
      <div
        className={`w-full sm:2/3 lg:w-1/2 ${
          loading ? 'pointer-events-none opacity-40' : ''
        }`}
      >
        <h1 className="text-xl sm:text-2xl text-left sm:text-center text-blue-800 font-bold my-0 sm:mt-2 sm:mb-5">
          {t('atsScan.title')}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 sm:gap-10 items-center w-full"
        >
          <AddJobOffer
            error={error}
            setError={setError}
            keywords={keywords}
            setKeywords={setKeywords}
            setAnalizeJobOffer={setAnalizeJobOffer}
            t={t}
          />
          <AddYourResume onFileChange={setResumeFile} error={error} t={t} />
          <div className="w-44 h-10 mb-5 sm:mb-8">
            <Button
              label={t('atsScan.sendButton')}
              type="submit"
              color="filled"
              isLoading={loading}
              disabled={loading}
            />
          </div>
        </form>
      </div>
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/30 backdrop-blur-[1px]">
          <Loading value={t('atsScan.loading')} />
        </div>
      )}
    </div>
  );
};

export default ScanForm;
