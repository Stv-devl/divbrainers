'use client';

import React, { useCallback, useState } from 'react';
import Button from '@/components/ui/buttons/Button';
import { AddJobOfferProps } from '@/types/type';
import { offerAnalyse } from '../../../../lib/actions/resumeScan/offerAnalyse';
import { jobOfferSchema } from '../../../../lib/schema/jobOfferShema';
import { cleanText } from '../../../../lib/utils/cleanText';
import { cn } from '../../../../lib/utils/cn';
import { iconsMap } from '../../../constante/iconsMap';

/**
 * Component that allows users to add and validate a job offer, extracting skills from the text
 * @component
 * @param {AddJobOfferProps} props - The component props
 * @param {Object} props.error - Error state object
 * @param {Function} props.setError - Function to update error state
 * @param {string[]} props.keywords - Array of extracted skills
 * @param {Function} props.setKeywords - Function to update keywords
 * @param {Function} props.setFormatedJobOffer - Function to update formatted job offer
 * @returns {JSX.Element} The rendered job offer input component
 */
const AddJobOffer: React.FC<AddJobOfferProps> = ({
  error,
  setError,
  keywords,
  setKeywords,
  setAnalizeJobOffer,
  t,
}) => {
  const [jobOffer, setJobOffer] = useState('');
  const [isValidated, setIsValidated] = useState(false);
  const [loading, setLoading] = useState(false);

  /**
   * Handles changes to the job offer textarea
   * @param {React.ChangeEvent<HTMLTextAreaElement>} e - The change event
   */
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setJobOffer(e.target.value);
      if (error?.jobOffer) {
        setError({ resume: error.resume });
      }
    },
    [error?.resume, error?.jobOffer, setError]
  );

  /**
   * Removes a keyword from the skills list
   * @param {string} value - The keyword to remove
   */
  const removeKeyword = useCallback(
    (value: string) => {
      if (keywords.length > 1) {
        setKeywords((prev) => prev.filter((item) => item !== value));
      }
    },
    [keywords, setKeywords]
  );

  /**
   * Validates the job offer and extracts skills
   */
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
      const cleanedJobOffer = cleanText(jobOffer);
      const { skills, rawOfferAnalyse } = await offerAnalyse(cleanedJobOffer);

      setKeywords(skills);
      setAnalizeJobOffer(rawOfferAnalyse);
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
    <div className="w-full space-y-4 sm:space-y-5 sm:bg-white py-4 sm:p-8 sm:rounded-lg sm:shadow-sm">
      <h2 className="text-lg sm:text-xl font-semibold text-blue-800">
        {t('atsScan.addJobOffer.title')}
      </h2>

      <div>
        <textarea
          id="jobOffer"
          name="joboffer"
          value={jobOffer}
          placeholder={t('atsScan.addJobOffer.placeholder')}
          className={cn(
            'input-theme w-full h-[200px] rounded-lg p-2 lg:p-4 text-sm lg:text-base resize-none',
            !!error?.jobOffer && !isValidated
              ? 'border-red-500 text-red-500'
              : 'text-neutral-500'
          )}
          onChange={handleChange}
          disabled={loading}
        />

        {(error?.jobOffer || error?.analizeJobOffer) && (
          <span className="text-red-500">
            {error.analizeJobOffer || error.jobOffer}
          </span>
        )}
      </div>

      {isValidated && keywords.length > 0 && (
        <>
          <h3 className="text-xl font-semibold text-blue-800">
            {t('atsScan.addJobOffer.skills')}
          </h3>
          <div className="flex gap-2 flex-wrap">
            {keywords.map((keyword, index) => (
              <div
                key={keyword + index}
                className="relative border border-blue-200 text-sm font-semibold gap-1 pl-3 pr-5 py-2 rounded-sm shadow-sm
                 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-md hover:bg-blue-50"
              >
                <div>{keyword}</div>
                <div className="absolute right-0 top-0">
                  <iconsMap.IconClose
                    className="size-5 cursor-pointer text-blue-800 hover:scale-110 transition-transform duration-300"
                    onClick={() => removeKeyword(keyword)}
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      <div className="w-44 h-10 mx-auto">
        <Button
          label={
            isValidated
              ? t('atsScan.addJobOffer.validated')
              : t('atsScan.addJobOffer.validate')
          }
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
