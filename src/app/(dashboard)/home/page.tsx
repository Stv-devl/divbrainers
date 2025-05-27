'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { features } from '../../../constante/constante';
import { iconsMap } from '../../../constante/iconsMap';

const featureRoutes: Record<string, string> = {
  'AI Interviews': '/interview',
  'ATS Resume Scan': '/scan',
};

const Home = () => {
  const router = useRouter();

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
        <h3 className="text-xl sm:text-2xl font-bold text-blue-800">{title}</h3>
        <p className="text-sm text-center">{description}</p>
      </div>
    );
  };

  return (
    <div className="mt-5">
      <h1 className="text-xl sm:text-2xl font-bold text-center text-blue-800 mb-5">
        Welcome to the V1 of DivBrainers
      </h1>

      <div className="flex flex-col gap-5">
        <h2 className="text-lg sm:text-xl font-bold text-blue-800">
          What you can do now:
        </h2>
        <div className="flex flex-wrap gap-4">
          {nowFeatures.map(({ icon, title, description }) =>
            renderFeatureCard(icon, title, description, true)
          )}
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-blue-800">
          What will come next:
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
