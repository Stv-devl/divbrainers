'use client';

import { TFunction } from 'i18next';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const useClientTranslation = () => {
  const { t } = useTranslation<'common'>();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const fallback = ((key: string) => key) as TFunction<'common'>;

  return {
    t: isClient ? t : fallback,
    isClient,
  };
};
