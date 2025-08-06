'use client';

import React, { useEffect, useState } from 'react';
import ResumeFeedbackList from '@/components/scan/scanFeedback/ResumeFeedbackList';
import BackButton from '@/components/ui/buttons/BackButton';
import { useClientTranslation } from '@/hooks/i18n/useClientTranslation';
import { FeedbackEntry } from '@/types/type';

/**
 * Page component that displays resume feedback
 * @component
 * @returns {JSX.Element | null} The rendered feedback page or null if no feedback is available
 */
const Page = () => {
  const [feedback, setFeedback] = useState<FeedbackEntry[] | null>(null);
  const { t, isClient } = useClientTranslation();

  console.log(feedback);

  useEffect(() => {
    const feedbackStored = sessionStorage.getItem('feedback');
    if (feedbackStored) {
      try {
        setFeedback(JSON.parse(feedbackStored));
      } catch (e) {
        console.error('Parsing error:', e);
      }
    }
  }, []);

  if (!feedback || !isClient) return null;

  return (
    <div className="relative p-4 sm:p-0 space-y-8 min-h-screen sm:max-w-[1950px] mx-auto">
      <section className="bg-white p-6 rounded-sm shadow-lg">
        <h2 className="text-2xl text-center font-bold text-blue-800 mb-6">
          {t('atsScan.feedback.title')}
        </h2>
        <ResumeFeedbackList feedback={feedback} />
      </section>
      <BackButton route="/scan" position="-top-10 sm:top-1 left-0 sm:left-1" />
    </div>
  );
};

export default Page;
