'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { iconsMap } from '../../constante/iconsMap';
import Button from '../buttons/Button';

/**
 * Advertising section component displaying key features and a call to action
 * @returns {JSX.Element} The advertising section component
 */
const AdvertisingSection = () => {
  const router = useRouter();

  const features = [
    '100% free and ad-free',
    'Suitable for beginners and experienced users',
    'Works on all screen sizes',
  ];

  return (
    <div className="flex flex-col gap-5 sm:gap-12 items-center justify-center">
      <div className="flex flex-col gap-3 ml-10 sm:ml-20">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-center gap-2 text-base sm:text-lg"
          >
            <iconsMap.IconCheck className="w-5 h-5 sm:w-10 sm:h-10 flex-shrink-0" />
            <p>{feature}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4 items-center justify-center">
        <h3 className="text-lg sm:text-2xl font-bold">
          Ready to boost your skills?
        </h3>
        <div className="w-[150px] h-[46px] text-sm sm:text-base">
          <Button
            onClick={() => router.push('/signup')}
            label="Sign up now!"
            color="filled"
          />
        </div>
      </div>
    </div>
  );
};

export default AdvertisingSection;
