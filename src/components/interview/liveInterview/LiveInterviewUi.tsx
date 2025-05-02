'use client';

import { Interview } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React from 'react';
import Loading from '@/components/loading/Loading';
import { iconsMap } from '@/constante/iconsMap';
import { useInterviewAgent } from '@/hooks/manage/useManageAgent';
import { UserProfile } from '@/types/type';
import InterviewControl from './InterviewControl';
import LiveInterviewCall from './LiveInterviewCall';
import CallInterviewMessage from './LiveInterviewMessage';

const loadingMessages: Record<string, string | null> = {
  CONNECTING: 'Connecting to the interviewer...',
  GENERATING_FEEDBACK: 'Generating feedback...',
};

/**
 * Component that displays the live interview user interface
 * @param {Object} props - Component props
 * @param {UserProfile} props.user - The user profile information
 * @returns {JSX.Element} The LiveInterviewUI component
 */
const LiveInterviewUI = ({
  user,
  interview,
}: {
  user: UserProfile;
  interview: Interview;
}) => {
  const router = useRouter();

  const { callStatus, isSpeaking, handleCall, handleDisconnect, lastMessage } =
    useInterviewAgent(user, interview);

  const loadingText = loadingMessages[callStatus];

  return (
    <div className="relative size-full">
      {loadingText && <Loading value={loadingText} isLoggedIn />}

      <div className="flex flex-col gap-5 items-center justify-center">
        <h1 className="mt-0 sm:mt-5 text-xl sm:text-3xl font-bold text-blue-900">
          Interview Front-End developer
        </h1>
        <p>Live technical interview with recruiter</p>
      </div>
      <LiveInterviewCall user={user} isSpeaking={isSpeaking} />
      <CallInterviewMessage lastMessage={lastMessage} />
      <InterviewControl
        callStatus={callStatus}
        handleCall={handleCall}
        handleDisconnect={handleDisconnect}
      />
      <div
        className="absolute top-[-36px] sm:top-0 left-0 flex items-center justify-center bg-blue-100 sm:size-10 size-8 rounded-md cursor-pointer transition-all duration-300 hover:scale-105"
        onClick={() => {
          handleDisconnect();
          router.push('/interview');
        }}
      >
        <iconsMap.IconBack className="size-5 sm:size-6" />
      </div>
    </div>
  );
};

export default LiveInterviewUI;
