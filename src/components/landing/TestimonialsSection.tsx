'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { iconsMap } from '@/constante/iconsMap';

/**
 * TestimonialsSection component
 * Displays customer testimonials
 * @returns {JSX.Element} The TestimonialsSection component
 */
const TestimonialsSection = () => {
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
              {t('landing.testimonials.title')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('landing.testimonials.subtitle')}
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            {/* Testimonial 1 */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-lg">
              <div className="p-6 flex flex-col h-full">
                {/* Photo + Nom et poste en haut */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-blue-100 ring-offset-2 ring-offset-white">
                    <img
                      src="/pexels-olly-774909.jpg"
                      alt="Marie Dubois"
                      className="w-full h-full object-cover transition-opacity duration-300"
                      loading="lazy"
                      decoding="async"
                      onLoad={(e) => {
                        e.currentTarget.style.opacity = '1';
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                      style={{ opacity: 0 }}
                      sizes="64px"
                      width="64"
                      height="64"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {t('landing.testimonials.testimonial1.name')}
                    </p>
                    <p className="text-sm text-gray-600">
                      {t('landing.testimonials.testimonial1.role')}
                    </p>
                  </div>
                </div>

                {/* Texte au milieu - prend l'espace disponible */}
                <p className="text-gray-600 italic text-center flex-1">
                  "{t('landing.testimonials.testimonial1.text')}"
                </p>

                {/* 5 étoiles en bas - toujours en bas */}
                <div className="flex items-center justify-center space-x-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <iconsMap.IconStar
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-lg">
              <div className="p-6 flex flex-col h-full">
                {/* Photo + Nom et poste en haut */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-blue-100 ring-offset-2 ring-offset-white">
                    <img
                      src="/pexels-simon-robben-55958-614810.jpg"
                      alt="Thomas Martin"
                      className="w-full h-full object-cover transition-opacity duration-300"
                      loading="lazy"
                      decoding="async"
                      onLoad={(e) => {
                        e.currentTarget.style.opacity = '1';
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                      style={{ opacity: 0 }}
                      sizes="64px"
                      width="64"
                      height="64"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {t('landing.testimonials.testimonial2.name')}
                    </p>
                    <p className="text-sm text-gray-600">
                      {t('landing.testimonials.testimonial2.role')}
                    </p>
                  </div>
                </div>

                {/* Texte au milieu - prend l'espace disponible */}
                <p className="text-gray-600 italic text-center flex-1">
                  "{t('landing.testimonials.testimonial2.text')}"
                </p>

                {/* 5 étoiles en bas - toujours en bas */}
                <div className="flex items-center justify-center space-x-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <iconsMap.IconStar
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-lg">
              <div className="p-6 flex flex-col h-full">
                {/* Photo + Nom et poste en haut */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-blue-100 ring-offset-2 ring-offset-white">
                    <img
                      src="/pexels-stefanstefancik-91227.jpg"
                      alt="Sophie Leroy"
                      className="w-full h-full object-cover transition-opacity duration-300"
                      loading="lazy"
                      decoding="async"
                      onLoad={(e) => {
                        e.currentTarget.style.opacity = '1';
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                      style={{ opacity: 0 }}
                      sizes="64px"
                      width="64"
                      height="64"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {t('landing.testimonials.testimonial3.name')}
                    </p>
                    <p className="text-sm text-gray-600">
                      {t('landing.testimonials.testimonial3.role')}
                    </p>
                  </div>
                </div>

                {/* Texte au milieu - prend l'espace disponible */}
                <p className="text-gray-600 italic text-center flex-1">
                  "{t('landing.testimonials.testimonial3.text')}"
                </p>

                {/* 5 étoiles en bas - toujours en bas */}
                <div className="flex items-center justify-center space-x-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <iconsMap.IconStar
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
