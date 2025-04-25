'use client';

import Image from 'next/image';
import React from 'react';
import { useProfileImage } from '@/hooks/ui/useProfileImage';
import { cn } from '../../../../lib/utils/cn';

export interface InterviewCardProps {
  name: string;
  position: string;
  image: string | File | null | undefined;
}

/**
 * Component that displays a card with user or recruiter information during an interview
 *
 * @param {Object} props - Component props
 * @param {string} props.name - The name of the person
 * @param {string} props.position - The job position of the person
 * @param {string|File|null|undefined} props.image - The profile image of the person
 * @returns {JSX.Element} A card component showing person details and profile image
 */
const InterviewCard = ({ name, position, image }: InterviewCardProps) => {
  const isRecruiter = name === 'Julia Divana';

  const { profileImage, handleImageError } = useProfileImage(
    typeof image === 'string' ? image : null
  );

  return (
    <div
      className={cn(
        'flex flex-col justify-center z-20 bg-white w-[90%] sm:w-[240px] h-full p-2 sm:p-5 rounded-lg shadow-sm',
        !isRecruiter && 'hidden sm:block'
      )}
    >
      <div className="flex flex-col items-center gap-3 justify-center">
        <p className="text-lg font-bold text-blue-900">{name}</p>
        <div className="bg-blue-100 rounded-md px-2 py-1 shadow-sm">
          <p className="text-blue-900">{position}</p>
        </div>
        <Image
          src={profileImage}
          alt={`${name} recruiter or user image`}
          width={180}
          height={180}
          className="size-[150px] lg:size-[180px] rounded-full object-cover border border-blue-500"
          priority
          onError={handleImageError}
        />
      </div>
    </div>
  );
};

export default InterviewCard;
