'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { useClientTranslation } from '@/hooks/i18n/useClientTranslation';
import { features } from '../../../constante/constante';
import { iconsMap } from '../../../constante/iconsMap';

const featureRoutes: Record<string, string> = {
  'features.ai.title': '/interview',
  'features.ats.title': '/scan',
  'features.quiz.title': '/quiz',
};

const Home = () => {
  const router = useRouter();
  const { t, isClient } = useClientTranslation();

  if (!isClient) return null;

  const enabledTitles = Object.keys(featureRoutes);

  const nowFeatures = features.filter((f) => enabledTitles.includes(f.title));
  const upcomingFeatures = features.filter(
    (f) => !enabledTitles.includes(f.title)
  );

  const renderFeatureCard = (
    icon: string,
    title: string,
    description: string,
    isEnabled: boolean
  ) => {
    const IconComponent = iconsMap[icon as keyof typeof iconsMap];
    const handleClick = () => {
      const path = featureRoutes[title];
      if (path) router.push(path);
    };

    return (
      <div
        key={title}
        className={`flex flex-col items-center justify-center gap-2 bg-white rounded-lg p-5 border border-gray-200 shadow-sm sm:max-w-[250px] transform transition-transform duration-300 ${
          isEnabled ? 'hover:scale-105 cursor-pointer' : ''
        }`}
        onClick={isEnabled ? handleClick : undefined}
      >
        <div className="w-8 h-8 sm:w-10 sm:h-10">
          <IconComponent className="w-full h-full" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-blue-800">
          {t(title)}
        </h3>
        <p className="text-sm text-center">{t(description)}</p>
      </div>
    );
  };

  return (
    <div className="mt-5">
      <h1 className="text-xl sm:text-2xl font-bold text-center text-blue-800 mb-5">
        {t('homepage.welcome')}
      </h1>

      <div className="flex flex-col gap-5">
        <h2 className="text-lg sm:text-xl font-bold text-blue-800">
          {t('homepage.now')}
        </h2>
        <div className="flex flex-wrap gap-4">
          {nowFeatures.map(({ icon, title, description }) =>
            renderFeatureCard(icon, title, description, true)
          )}
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-blue-800">
          {t('homepage.soon')}
        </h3>
        <div className="flex flex-wrap gap-4">
          {upcomingFeatures.map(({ icon, title, description }) =>
            renderFeatureCard(icon, title, description, false)
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
