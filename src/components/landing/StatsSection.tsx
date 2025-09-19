'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * StatsSection component
 * Displays statistics about the platform
 * @returns {JSX.Element} The StatsSection component
 */
const StatsSection = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-blue-50 py-6 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center space-y-12"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
            {t('landing.stats.title')}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-blue-600">10k+</div>
              <div className="text-gray-600">
                {t('landing.stats.exercisesSolved')}
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-blue-600">95%</div>
              <div className="text-gray-600">
                {t('landing.stats.successRate')}
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-blue-600">500+</div>
              <div className="text-gray-600">
                {t('landing.stats.activeUsers')}
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-blue-600">24/7</div>
              <div className="text-gray-600">
                {t('landing.stats.continuousAccess')}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
