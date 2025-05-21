'use client';

import React, { useCallback, useState } from 'react';
import Button from '@/components/ui/buttons/Button';
import { AddJobOfferProps } from '@/types/type';
import { findSkills } from '../../../../lib/actions/resumeScan/findSkills';
import { jobOfferSchema } from '../../../../lib/schema/jobOfferShema';
import { cleanText } from '../../../../lib/utils/cleanText';
import { cn } from '../../../../lib/utils/cn';
import { iconsMap } from '../../../constante/iconsMap';

const AddJobOffer: React.FC<AddJobOfferProps> = ({
  error,
  setError,
  keywords,
  setKeywords,
  formatedJobOffer,
  setFormatedJobOffer,
}) => {
  const [jobOffer, setJobOffer] = useState('');
  const [isValidated, setIsValidated] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setJobOffer(e.target.value);
      if (error?.jobOffer) {
        setError({ resume: error.resume });
      }
    },
    [error?.resume, error?.jobOffer, setError]
  );

  const removeKeyword = useCallback(
    (value: string) => {
      if (keywords.length > 1) {
        setKeywords((prev) => prev.filter((item) => item !== value));
      }
    },
    [keywords, setKeywords]
  );

  const handleValidate = async () => {
    const result = jobOfferSchema.safeParse({ jobOffer });

    if (!result.success) {
      const message = result.error.flatten().fieldErrors.jobOffer?.[0];
      setError({ jobOffer: message, resume: error?.resume });
      return;
    }
    setLoading(true);
    setError({ resume: error?.resume });
    try {
      const cleaned = cleanText(jobOffer);
      setFormatedJobOffer(cleaned);

      const skills = await findSkills(cleaned);
      setKeywords(skills);
      setIsValidated(true);
    } catch (err) {
      setError({
        jobOffer: 'An error occurred',
        resume: error?.resume,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="my-2 text-center font-semibold text-blue-800">
        Copy and paste the job offer:
      </h1>

      <textarea
        id="jobOffer"
        name="joboffer"
        value={jobOffer}
        placeholder="Add the job offer here"
        className={cn(
          'input-theme w-[350px] h-[250px] rounded-lg p-2 lg:p-4 text-sm lg:text-base resize-none',
          !!error?.jobOffer && !isValidated
            ? 'border-red-500 text-red-500'
            : 'text-neutral-500'
        )}
        onChange={handleChange}
        disabled={loading}
      />

      {(error?.jobOffer || error?.formatedJobOffer) && (
        <span className="text-red-500">
          {error.formatedJobOffer || error.jobOffer}
        </span>
      )}

      {isValidated && keywords.length > 0 && (
        <>
          <h2>Position skills :</h2>
          <div className="flex gap-2 flex-wrap">
            {keywords.map((keyword, index) => (
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
          label={isValidated ? 'Validated' : 'Validate offer'}
          type="button"
          color="filled"
          onClick={handleValidate}
          isLoading={loading}
          disabled={loading || isValidated}
        />
      </div>
    </div>
  );
};

export default AddJobOffer;
