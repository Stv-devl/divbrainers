'use client';

import Image from 'next/image';
import React from 'react';
import useTechIcons from '@/hooks/ui/useTechIcon';
import useInterviewStore from '@/store/useStoreInterview';
import { iconsMap } from '../../constante/iconsMap';

/**
 * Component that displays the technical stack with icons
 * @returns A component showing tech stack icons
 */
const TechnicalStackWrapper = () => {
  const { stack, removeFromStack } = useInterviewStore();

  const icons = useTechIcons(stack);
  return (
    <div className="flex flex-wrap gap-2 w-[90%] mx-auto lg:mx-0 lg:max-w-[50%]">
      {icons.map((item, index) => (
        <div
          key={index}
          className="relative text-sm flex items-center justify-center gap-1 pl-3 pr-5 py-2 border border-blue-500 rounded-sm "
        >
          <Image
            src={item.url}
            alt="tech stack icon"
            width={20}
            height={20}
            className="object-cover w-[20px] h-[20px]"
            priority
          />
          <p>{item.tech}</p>
          <iconsMap.IconClose
            className="absolute size-5 right-0 top-0 cursor-pointer hover:scale-105 transition-transform duration-500"
            onClick={() => {
              removeFromStack(item.tech);
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default TechnicalStackWrapper;
