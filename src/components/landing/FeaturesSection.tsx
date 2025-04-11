import React from 'react';
import { features } from '@/constante/constante';
import FeatureCard from './FeatureCard';

/**
 * FeaturesSection component
 * Displays a section with features and a title
 * @returns {JSX.Element} The FeaturesSection component
 */
const FeaturesSection = () => {
  return (
    <div className="bg-blue-100 w-screen relative overflow-x-hidden py-5 sm:py-20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8 items-center">
        <h2 className="text-center text-lg sm:text-xl lg:text-2xl font-bold">
          Improve your coding skills and practice job interviews :
        </h2>
        <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
