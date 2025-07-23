'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { iconsMap } from '../../constante/iconsMap';
import Button from '../ui/buttons/Button';

/**
 * Advertising section component displaying key features and a call to action
 * @returns {JSX.Element} The advertising section component
 */
const AdvertisingSection = () => {
  const router = useRouter();

  const { t } = useTranslation();

  const features = [
    t('advertising.free'),
    t('advertising.suitable'),
    t('advertising.responsive'),
  ];

  return (
    <div className="flex flex-col gap-5 mb-5 sm:mb-12 sm:gap-12 items-center justify-center">
      <div className="flex flex-col gap-3 ml-10 sm:ml-20">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-center gap-2 text-base sm:text-lg"
          >
            <iconsMap.IconCheck className="w-5 h-5 sm:w-10 sm:h-10 flex-shrink-0" />
            <p>{feature}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4 items-center justify-center">
        <h3 className="text-lg sm:text-2xl font-bold">
          {t('advertising.ctaTitle')}
        </h3>
        <div className="w-[150px] h-[46px] text-sm sm:text-base">
          <Button
            onClick={() => router.push('/signup')}
            label={t('advertising.ctaButton')}
            color="filled"
          />
        </div>
      </div>
    </div>
  );
};

export default AdvertisingSection;
