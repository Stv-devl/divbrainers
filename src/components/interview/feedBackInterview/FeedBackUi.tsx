import React from 'react';
import BackButton from '@/components/ui/buttons/BackButton';
import { useClientTranslation } from '@/hooks/i18n/useClientTranslation';
import FeedbackSection from './FeedBackSection';

interface FeedBackUiProps {
  strengths: string;
  areasForImprovement: string;
  finalAssessment: string;
  totalScore: number;
  position: string;
}

const FeedBackUi = ({
  strengths,
  areasForImprovement,
  finalAssessment,
  totalScore,
  position,
}: FeedBackUiProps) => {
  const { t, isClient } = useClientTranslation();

  if (!isClient) return null;

  return (
    <>
      <h1 className="text-3xl font-bold text-blue-800 mb-6 border-b border-blue-800 pb-4">
        {t('interviewFeedback.title', { position })}
      </h1>

      <FeedbackSection
        title={t('interviewFeedback.sections.strengths')}
        content={strengths}
      />

      <FeedbackSection
        title={t('interviewFeedback.sections.areasForImprovement')}
        content={areasForImprovement}
      />
      <FeedbackSection
        title={t('interviewFeedback.sections.finalAssessment')}
        content={finalAssessment}
      />

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 ml-auto">
        <span className="w-full text-center text-2xl font-bold text-blue-800">
          {t('interviewFeedback.score', { score: totalScore })}
        </span>
      </div>
      <BackButton
        route="/interview"
        position="-top-9 sm:top-3 sm:left-3 left-0 "
      />
    </>
  );
};

export default FeedBackUi;
