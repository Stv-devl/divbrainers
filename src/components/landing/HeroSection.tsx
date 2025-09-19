'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { iconsMap } from '@/constante/iconsMap';
import Button from '../ui/buttons/Button';

/**
 * HeroSection component
 * Displays a hero section with a title, description and buttons
 * @returns {JSX.Element} The HeroSection component
 */
const HeroSection = () => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <section className="bg-blue-50 py-6 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center space-y-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <div className="inline-flex items-center text-left sm:text-center px-4 py-2 rounded-full bg-blue-100 text-blue-600 text-xs md:text-sm font-medium">
            <iconsMap.IconStar className="w-4 h-4 mr-2.5" />
            {t('landing.hero.badge')}
          </div>

          <h1 className="text-3xl md:text-6xl font-bold tracking-tight text-gray-900">
            {t('landing.hero.title')}
            <span className="text-blue-600">
              {' '}
              {t('landing.hero.titleHighlight')}
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('landing.hero.description')}
          </p>

          <div className="flex justify-center">
            <div className="w-[150px] h-[50px]">
              <Button
                onClick={() => router.push('/signup')}
                label={t('landing.hero.cta')}
                color="filled"
                fontSize="text-lg"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
