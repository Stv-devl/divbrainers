'use client';

import React from 'react';
import { useClientTranslation } from '@/hooks/i18n/useClientTranslation';

const SetInterviewCardTitle = () => {
  const { t, isClient } = useClientTranslation();

  if (!isClient) return null;
  return (
    <h1 className="text-lg sm:text-xl font-bold text-blue-800 mb-2">
      {t('interview.titleWrapper.titlePreviousInterviews')}
    </h1>
  );
};

export default SetInterviewCardTitle;
