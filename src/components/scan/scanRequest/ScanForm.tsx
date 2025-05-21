import React, { useState } from 'react';
import Button from '@/components/ui/buttons/Button';
import { FormError } from '@/types/type';
import { scanSchema } from '../../../../lib/schema/scanShema';
import AddJobOffer from './AddJobOffer';
import AddYourResume from './AddYourResume';

const ScanForm = () => {
  const [error, setError] = useState<FormError>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [formatedJobOffer, setFormatedJobOffer] = useState('');

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
      //ici on envois keywords + l'offre d'emplois nettoyer
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
        error={error}
        setError={setError}
        keywords={keywords}
        setKeywords={setKeywords}
        formatedJobOffer={formatedJobOffer}
        setFormatedJobOffer={setFormatedJobOffer}
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
