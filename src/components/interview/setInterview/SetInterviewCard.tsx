'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import useTechIcons from '@/hooks/ui/useTechIcon';
import { JobInterviewProps } from '@/types/type';
import { cn } from '../../../../lib/utils/cn';
import { formatDate } from '../../../../lib/utils/formatDate';
import { iconsMap } from '../../../constante/iconsMap';
import SetInterviewCardControl from './SetInterviewCardControl';

/**
 * Component that displays an interview card with details about a specific interview
 *
 * @param {Object} props - Component props
 * @param {JobInterviewProps} props.interview - The interview data to display
 * @returns {JSX.Element} A card component showing interview details including position, type, date, difficulty, score and tech stack
 */
const SetInterviewCard = ({ interview }: { interview: JobInterviewProps }) => {
  const router = useRouter();

  const {
    id,
    position,
    interviewType,
    createdAt,
    difficulty,
    feedback,
    stack,
  } = interview;

  const icons = useTechIcons(stack);
  const score = feedback[0]?.totalScore;
  const feedbackId = feedback[0]?.id;

  const scoreDisplay =
    score !== undefined ? (
      <span
        className={cn(
          'font-medium',
          score < 10 && 'text-red-500',
          score >= 10 && score < 14 && 'text-orange-700',
          score >= 14 && 'text-green-800'
        )}
      >
        {`${score < 10 ? `0${score}` : score}/20`}
      </span>
    ) : (
      'pending'
    );

  const details = [
    { icon: iconsMap.IconCalendar, text: formatDate(createdAt) },
    { icon: iconsMap.IconBadge, text: difficulty },
    {
      icon: iconsMap.IconStar,
      text: scoreDisplay,
      route: feedbackId
        ? `/interview/live/${id}/feedback/${feedbackId}`
        : undefined,
    },
  ];

  const navigateTo = (route?: string) => {
    if (route) router.push(route);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-300 w-[240px] sm:w-[220px] h-[280px]">
      <div className="text-center mb-4">
        <h2 className="text-blue-800 font-bold capitalize">
          Interview {position}
        </h2>
        <p className="capitalize">{interviewType}</p>
      </div>

      <div className="flex flex-col items-start gap-3">
        {details.map(({ icon: Icon, text, route }, index) => (
          <div
            key={index}
            onClick={() => navigateTo(route)}
            className={cn(
              'flex items-center gap-2',
              route && 'cursor-pointer hover:opacity-80 transition-opacity'
            )}
          >
            <Icon
              className={cn(
                Icon === iconsMap.IconBadge ? 'size-[30px] -ml-1' : 'size-6'
              )}
            />
            <p className="capitalize">{text}</p>
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
