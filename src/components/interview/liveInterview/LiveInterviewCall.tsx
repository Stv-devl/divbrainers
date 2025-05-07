import { Interview } from '@prisma/client';
import React from 'react';
import { UserProfile } from '@/types/type';
import { iconsMap } from '../../../constante/iconsMap';
import InterviewCard from './InterviewCard';

/**
 * Component that displays the interview call interface with the recruiter and user
 * @param {Object} props - Component props
 * @param {UserProfile} props.user - The user profile information
 * @returns {JSX.Element} The CallInterviewCall component
 */
const LiveInterviewCall = ({
  user,
  interview,
  isSpeaking,
}: {
  user: UserProfile;
  interview: Interview;
  isSpeaking: boolean;
}) => {
  return (
    <div className="w-[98%] sm:w-[95%] lg:w-[90%] xl:w-[75%] mx-auto">
      <div className="relative flex flex-col sm:flex-row gap-5 items-center justify-between mx-auto mt-5 sm:mt-10">
        <InterviewCard
          name="Julia Divana"
          position="Recruiter Umbrela Corps "
          image="/images/recruiter.png"
        />
        <div className="relative hidden sm:block z-20">
          {isSpeaking && (
            <div className="absolute top-[10px] left-[10px] size-10 lg:top-[15px] lg:left-[14px] lg:size-12 rounded-full border-4 border-blue-800 animate-ping opacity-75" />
          )}
          <div className="bg-blue-100 border-2 border-blue-800 lg:p-3 p-2 rounded-full">
            <iconsMap.IconPhone className="pt-1 pr-1 lg:size-12 size-10" />
          </div>
        </div>
        <InterviewCard
          name={user?.name ?? 'Unknown user'}
          position={interview.position ?? 'Unknown position'}
          image={user?.image}
        />
        <hr className="hidden sm:block absolute z-10 w-full border-t-2 top-[150px] left-0 border-gray-300" />
      </div>
    </div>
  );
};

export default LiveInterviewCall;
