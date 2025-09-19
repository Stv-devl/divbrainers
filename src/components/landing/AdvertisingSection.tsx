'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { iconsMap } from '@/constante/iconsMap';
import Button from '../ui/buttons/Button';

/**
 * Advertising section component displaying key features and a call to action
 * @returns {JSX.Element} The advertising section component
 */
const AdvertisingSection = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const features = t('landing.advertising.features', {
    returnObjects: true,
  }) as string[];

  return (
    <section className="bg-blue-50 py-6 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="flex flex-col gap-5 mb-5 sm:mb-12 sm:gap-12 items-center justify-center"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <div className="flex flex-col gap-3 ml-10 sm:ml-20">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-base sm:text-lg"
              >
                <iconsMap.IconCheck className="w-5 h-5 sm:w-10 sm:h-10 flex-shrink-0 text-blue-600" />
                <p className="text-gray-700">{feature}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4 items-center justify-center">
            <h3 className="text-lg sm:text-2xl font-bold text-gray-900">
              {t('landing.advertising.ctaTitle')}
            </h3>
            <div className="w-[150px] h-[50px] text-sm sm:text-base">
              <Button
                onClick={() => router.push('/signup')}
                label={t('landing.advertising.ctaButton')}
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

export default AdvertisingSection;
