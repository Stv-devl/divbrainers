'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Loading from '@/components/loading/Loading';
import Button from '@/components/ui/buttons/Button';
import postResume from '@/service/scan/postResume';
import { FormError } from '@/types/type';
import { scanSchema } from '../../../../lib/shemaServer/scanShema';
import { cleanAndParseJSON } from '../../../../lib/utils/cleanAndParseJSON';
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
  const [formatedJobOffer, setFormatedJobOffer] = useState('');

  const router = useRouter();

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
      formatedJobOffer,
    });
    if (!result.success) {
      const { resumeFile, formatedJobOffer } =
        result.error.flatten().fieldErrors;
      setError({
        resume: resumeFile?.[0],
        formatedJobOffer: formatedJobOffer?.[0],
      });
      return;
    }
    setLoading(true);
    try {
      if (!resumeFile) {
        setLoading(false);
        return;
      }
      const response = await postResume(resumeFile, keywords, formatedJobOffer);

      if (!response.success) {
        setError({ resume: response.message });
        setLoading(false);
        return;
      }
      const parsedFeedback = cleanAndParseJSON(response.feedback);
      sessionStorage.setItem('feedback', JSON.stringify(parsedFeedback));
      router.push('scan/feedback');
    } catch (err) {
      console.error(err);
      setError({ resume: 'An unexpected error occurred.' });
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      <div
        className={`w-full sm:2/3 lg:w-1/2 ${
          loading ? 'pointer-events-none opacity-40' : ''
        }`}
      >
        <h1 className="text-xl sm:text-2xl text-left sm:text-center text-blue-800 font-bold my-0 sm:mt-2 sm:mb-5">
          ATS scan your resume
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
            setFormatedJobOffer={setFormatedJobOffer}
          />
          <AddYourResume onFileChange={setResumeFile} error={error} />
          <div className="w-44 h-10 mb-5 sm:mb-8">
            <Button
              label="Send your resume"
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
          <Loading value="Generating feedback..." />
        </div>
      )}
    </div>
  );
};

export default ScanForm;
