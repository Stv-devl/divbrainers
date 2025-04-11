import React from 'react';
import { iconsMap } from '@/constante/iconsMap';

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

/**
 * FeatureCard component
 * Displays a card with an icon, title and description
 * @param {FeatureCardProps} - The props for the FeatureCard component
 * @returns {JSX.Element} The FeatureCard component
 */
const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  const IconComponent = iconsMap[icon as keyof typeof iconsMap];

  return (
    <div className="flex flex-col items-center justify-center gap-2 bg-white rounded-lg p-5 border border-gray-200 shadow-sm sm:max-w-[250px] transform transition-transform duration-300 hover:scale-105">
      <div className="flex flex-col items-center ">
        <div className=" w-8 h-8 sm:w-10 sm:h-10">
          {IconComponent && <IconComponent className="w-full h-full" />}
        </div>
        <h3 className="text-xl sm:text-2xl font-bold">{title}</h3>
      </div>
      <p className="text-sm">{description}</p>
    </div>
  );
};

export default FeatureCard;
