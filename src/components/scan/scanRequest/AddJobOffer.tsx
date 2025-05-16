'use client';

import React, { useState } from 'react';
import { z } from 'zod';
import Button from '@/components/ui/buttons/Button';
import { cn } from '../../../../lib/utils/cn';
import { iconsMap } from '../../../constante/iconsMap';

type FormError = {
  resume?: string;
  jobOffer?: string;
};

interface AddJobOfferProps {
  onValidateChange: (isValid: boolean) => void;
  error?: FormError;
  setError: (error: FormError) => void;
}

const jobOfferSchema = z.object({
  jobOffer: z
    .string({
      required_error: 'The job offer cannot be empty',
      invalid_type_error: 'The job offer must be text',
    })
    .min(20, 'The job offer must contain at least 20 characters')
    .max(2000, 'The job offer must not exceed 2000 characters'),
});

const AddJobOffer: React.FC<AddJobOfferProps> = ({
  onValidateChange,
  error,
  setError,
}) => {
  const [jobOffer, setJobOffer] = useState('');
  const [keywordsMock, setKeywordsMock] = useState<string[]>([
    'React',
    'Next',
    'Typescript',
    'Node.js',
    'Github',
  ]);
  const [isValidate, setIsValidate] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJobOffer(e.target.value);
    setError({ resume: error?.resume });
  };

  const handleSendOffer = async () => {
    const result = jobOfferSchema.safeParse({ jobOffer });

    if (!result.success) {
      const message = result.error.flatten().fieldErrors.jobOffer?.[0];
      setError({ jobOffer: message, resume: error?.resume });
      return;
    }
    setLoading(true);
    setError({ resume: error?.resume });
    try {
      await new Promise((res) => setTimeout(res, 2000));
      setIsValidate(true);
      onValidateChange(true);
    } catch (err) {
      setError({ jobOffer: 'An error occurred', resume: error?.resume });
    } finally {
      setLoading(false);
    }
  };

  const removeKeyword = (value: string) => {
    setKeywordsMock((prev) => prev.filter((item) => item !== value));
  };

  const textareaClasses = cn(
    'input-theme w-[350px] h-[250px] rounded-lg p-2 lg:p-4 text-sm lg:text-base resize-none',
    !!error?.jobOffer && !isValidate
      ? 'border-red-500 text-red-500'
      : 'text-neutral-500'
  );

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="my-2 text-center font-semibold text-blue-800">
        Copy and paste the job offer:
      </h1>
      <textarea
        className={textareaClasses}
        name="joboffer"
        id="jobOffer"
        placeholder="Add the job offer here"
        value={jobOffer}
        onChange={handleChangeTextArea}
        disabled={loading}
      />
      {error?.jobOffer && (
        <span className="text-red-500">{error.jobOffer}</span>
      )}
      {isValidate && keywordsMock.length > 0 && (
        <>
          <h2>Position skills :</h2>
          <div className="flex gap-2 flex-wrap">
            {keywordsMock.map((keyword, index) => (
              <div
                key={keyword + index}
                className="relative border border-blue-200 text-sm font-semibold gap-1 pl-3 pr-5 py-2 rounded-sm shadow-sm"
              >
                <div>{keyword}</div>
                <iconsMap.IconClose
                  className="absolute size-5 right-0 top-0 cursor-pointer hover:scale-105 transition-transform duration-500"
                  onClick={() => removeKeyword(keyword)}
                />
              </div>
            ))}
          </div>
        </>
      )}

      <div className="w-35 h-10">
        <Button
          label={isValidate ? 'Validated' : 'Validate offer'}
          type="button"
          color="filled"
          onClick={handleSendOffer}
          isLoading={loading}
          disabled={loading || isValidate}
        />
      </div>
    </div>
  );
};

export default AddJobOffer;
