'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * HowItWorksSection component
 * Displays a section explaining how the platform works
 * @returns {JSX.Element} The HowItWorksSection component
 */
const HowItWorksSection = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-white py-6 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center space-y-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <div className="space-y-4">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
              {t('landing.howItWorks.title')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('landing.howItWorks.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                {t('landing.howItWorks.step1.title')}
              </h3>
              <p className="text-gray-600">
                {t('landing.howItWorks.step1.description')}
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                {t('landing.howItWorks.step2.title')}
              </h3>
              <p className="text-gray-600">
                {t('landing.howItWorks.step2.description')}
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                {t('landing.howItWorks.step3.title')}
              </h3>
              <p className="text-gray-600">
                {t('landing.howItWorks.step3.description')}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
