'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { iconsMap } from '@/constante/iconsMap';
import { UserProfile } from '@/types/type';
import InterviewControl from './InterviewControl';
import LiveInterviewCall from './LiveInterviewCall';
import CallInterviewMessage from './LiveInterviewMessage';

/**
 * Component that displays the live interview user interface
 * @param {Object} props - Component props
 * @param {UserProfile} props.user - The user profile information
 * @returns {JSX.Element} The LiveInterviewUI component
 */
const LiveInterviewUI = ({ user }: { user: UserProfile }) => {
  const router = useRouter();

  return (
    <div className="relative size-full">
      <div className="flex flex-col gap-5 items-center justify-center">
        <h1 className="mt-0 sm:mt-5 text-xl sm:text-3xl font-bold text-blue-900">
          Interview Front-End developer
        </h1>
        <p>Live technical interview with recruiter</p>
      </div>
      <LiveInterviewCall user={user} />
      <CallInterviewMessage />
      <InterviewControl />
      <div
        className="absolute top-[-36px] sm:top-0 left-0 flex items-center justify-center bg-blue-100 sm:size-10 size-8 rounded-md cursor-pointer transition-all duration-300 hover:scale-105"
        onClick={() => router.push('/interview')}
      >
        <iconsMap.IconBack className="size-5 sm:size-6" />
      </div>
    </div>
  );
};

export default LiveInterviewUI;
