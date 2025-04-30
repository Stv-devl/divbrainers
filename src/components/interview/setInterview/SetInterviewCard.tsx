'use client';

import Image from 'next/image';
import React from 'react';
import useTechIcons from '@/hooks/ui/useTechIcon';
import { JobInterviewProps } from '@/types/type';
import { formatDate } from '../../../../lib/utils/formatDate';
import { iconsMap } from '../../../constante/iconsMap';
import SetInterviewCardControl from './SetInterviewCardControl';

/**
 * Component that displays a card with information about a previous job interview
 *
 * @param {Object} props - Component props
 * @param {JobInterviewProps} props.interview - The interview data to display
 * @returns {JSX.Element} A card component showing interview details and actions
 */
const SetInterviewCard = ({ interview }: { interview: JobInterviewProps }) => {
  const { id, position, interviewType, createdAt, difficulty, score, stack } =
    interview;

    console.log("id", id);
    

  const icons = useTechIcons(stack);

  const details = [
    { icon: iconsMap.IconCalendar, text: formatDate(createdAt) },
    { icon: iconsMap.IconBadge, text: difficulty },
    { icon: iconsMap.IconStar, text: score ? score : 'pending' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-300 w-[240px] sm:w-[200px] h-[270px]">
      <div className="text-center mb-4">
        <h2 className="text-blue-800 font-bold">{position} interview</h2>
        <p>{interviewType}</p>
      </div>

      <div className="flex flex-col items-start gap-3">
        {details.map(({ icon: Icon, text }, index) => (
          <div key={index} className="flex items-center gap-2">
            <Icon
              className={`${
                Icon === iconsMap.IconBadge ? 'size-[30px] -ml-1' : 'size-6'
              }`}
            />
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
        <SetInterviewCardControl interviewId={id} />
      </div>
    </div>
  );
};

export default SetInterviewCard;
