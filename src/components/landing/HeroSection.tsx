'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../ui/buttons/Button';

/**
 * HeroSection component
 * Displays a hero section with a title, description and a button
 * @returns {JSX.Element} The HeroSection component
 */
const HeroSection = () => {
  const router = useRouter();

  const { t } = useTranslation();
  return (
    <div className="flex flex-col sm:flex-row gap-5 justify-around items-center w-full sm:mt-14">
      <div className="flex flex-col max-w-[90%] sm:max-w-[350px] lg:max-w-[500px] gap-6 items-center justify-center p-10 bg-white rounded-lg border-2 border-gray-200 shadow-lg transform transition-transform duration-300 hover:scale-105">
        <h1 className="text-lg lg:text-3xl text-center font-bold">
          {t('hero.title')}
        </h1>
        <p className="text-sm lg:text-lg">{t('hero.description')}</p>
        <div className="w-[150px] h-[46px] text-sm sm:text-base">
          <Button
            onClick={() => router.push('/signup')}
            label={t('hero.cta')}
            color="filled"
          />
        </div>
      </div>
      <Image
        src="/images/hero_image.png"
        alt="Code console with instructions"
        priority
        width={500}
        height={500}
        className="max-w-[80%] sm:w-[350px] lg:w-[450px] sm:h-[350px] lg:h-[450px] rounded-lg"
      />
    </div>
  );
};

export default HeroSection;
