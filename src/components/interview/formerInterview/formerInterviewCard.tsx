'use client';

import Image from 'next/image';
import React from 'react';
import Button from '@/components/buttons/Button';
import useTechIcons from '@/hooks/ui/useTechIcon';
import { JobInterviewProps } from '@/types/type';
import { iconsMap } from '../../../constante/iconsMap';

/**
 * Component that displays a card with information about a previous job interview
 *
 * @param {Object} props - Component props
 * @param {JobInterviewProps} props.interview - The interview data to display
 * @returns {JSX.Element} A card component showing interview details and actions
 */
const FormerInterviewCard = ({
  interview,
}: {
  interview: JobInterviewProps;
}) => {
  const { position, type, date, difficulty, score, stack } = interview;

  const icons = useTechIcons(stack);

  const details = [
    { icon: iconsMap.IconCalendar, text: date },
    { icon: iconsMap.IconBadge, text: difficulty },
    { icon: iconsMap.IconStar, text: score },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-300 w-[240px] sm:w-[200px] h-[270px]">
      <div className="text-center mb-4">
        <h2 className="text-blue-800 font-bold">{position} interview</h2>
        <p>{type}</p>
      </div>

      <div className="flex flex-col items-start gap-3">
        {details.map(({ icon: Icon, text }, index) => (
          <div key={index} className="flex items-center gap-2">
            <Icon className="size-6" />
            <p>{text}</p>
          </div>
        ))}

        <div className="flex flex-wrap gap-1 mt-1">
          {icons.map((item, index) => (
            <div
              key={index}
              className="p-0.5 border border-blue-500 rounded-sm"
            >
              <Image
                src={item.url}
                alt="tech stack icon"
                width={16}
                height={16}
                className="object-cover w-[16px] h-[16px]"
                priority
              />
            </div>
          ))}
        </div>

        <div className="flex justify-between w-full ">
          <div className="w-20 h-6">
            <Button
              label="Delete"
              color="filled"
              bgColor="bg-red-500"
              fontSize="text-sm"
              hoverColor="hover:bg-red-800"
            />
          </div>
          <div className="w-20 h-6">
            <Button label="Start" color="filled" fontSize="text-sm" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormerInterviewCard;
