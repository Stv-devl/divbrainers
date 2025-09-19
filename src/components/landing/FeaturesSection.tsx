'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { features } from '@/constante/constante';
import { iconsMap } from '@/constante/iconsMap';

/**
 * FeaturesSection component
 * Displays a section with features and a title
 * @returns {JSX.Element} The FeaturesSection component
 */
const FeaturesSection = () => {
  const { t } = useTranslation();

  return (
    <section id="features-section" className="bg-blue-100 py-6 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center space-y-12"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <div className="space-y-4">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
              {t('landing.features.title')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('landing.features.subtitle')}
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {features
              .filter((feature) => feature.icon !== 'IconSats')
              .map((feature) => {
                const IconComponent =
                  iconsMap[feature.icon as keyof typeof iconsMap];
                return (
                  <div
                    key={feature.title}
                    className="bg-white rounded-xl border border-gray-200 shadow-lg"
                  >
                    <div className="p-6 space-y-4">
                      <div className="flex justify-center items-center gap-4">
                        <div className="w-14 h-14 flex items-center justify-center">
                          {IconComponent && (
                            <IconComponent className="w-full h-full text-blue-600" />
                          )}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {t(feature.title)}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600">
                        {t(feature.description)}
                      </p>
                    </div>
                  </div>
                );
              })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
