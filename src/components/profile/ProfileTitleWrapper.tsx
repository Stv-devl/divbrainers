'use client';

import React from 'react';
import { useClientTranslation } from '@/hooks/i18n/useClientTranslation';

const ProfileTitleWRapper = () => {
  const { t, isClient } = useClientTranslation();

  if (!isClient) return null;

  return (
    <>
      <h1 className="font-color-theme text-2xl font-bold mb-4">
        {t('profile.titleWrapper.title')}
      </h1>
      <p className="mb-6">{t('profile.titleWrapper.description')}</p>
    </>
  );
};

export default ProfileTitleWRapper;
