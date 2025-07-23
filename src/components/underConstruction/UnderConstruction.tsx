'use client';

import React from 'react';
import { useClientTranslation } from '@/hooks/i18n/useClientTranslation';

/**
 * UnderConstruction component that displays a page under construction message
 * @component
 * @returns {JSX.Element} The rendered UnderConstruction component with a title and message
 */
const UnderConstruction = () => {
  const { t, isClient } = useClientTranslation();

  if (!isClient) return null;

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 pt-24 lg:pt-0 sm:mt-10">
      <h1 className="mb-4 text-center text-2xl font-bold text-gray-800 sm:text-3xl md:text-4xl">
        {t('underConstruction.title')}
      </h1>
      <p className="text-center text-base text-gray-600 sm:text-lg md:text-xl">
        {t('underConstruction.message')}
      </p>
    </div>
  );
};

export default UnderConstruction;
