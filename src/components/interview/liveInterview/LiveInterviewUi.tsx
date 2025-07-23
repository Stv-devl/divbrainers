'use client';

import { Interview } from '@prisma/client';
import React from 'react';
import Loading from '@/components/loading/Loading';
import BackButton from '@/components/ui/buttons/BackButton';
import { useClientTranslation } from '@/hooks/i18n/useClientTranslation';
import { useInterviewAgent } from '@/hooks/manage/useManageAgent';
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
const LiveInterviewUI = ({
  user,
  interview,
}: {
  user: UserProfile;
  interview: Interview;
}) => {
  const { t, isClient } = useClientTranslation();
  const { callStatus, isSpeaking, handleCall, handleDisconnect, messages } =
    useInterviewAgent(user, interview);

  const loadingMessages: Record<string, string | null> = {
    CONNECTING: t('liveInterview.loadingMessages.CONNECTING'),
    GENERATING_FEEDBACK: t('liveInterview.loadingMessages.GENERATING_FEEDBACK'),
  };

  const loadingText = loadingMessages[callStatus];

  if (!isClient) return null;

  return (
    <div className="relative size-full">
      {loadingText && <Loading value={loadingText} isLoggedIn />}

      <div className="flex flex-col gap-5 items-center justify-center">
        <h1 className="mt-0 sm:mt-5 text-xl sm:text-3xl font-bold text-blue-900">
          {t('liveInterview.title', { position: interview.position })}
        </h1>
        <p>{t('liveInterview.subtitle')}</p>
      </div>
      <LiveInterviewCall
        user={user}
        interview={interview}
        isSpeaking={isSpeaking}
      />
      <CallInterviewMessage messages={messages} t={t} />
      <InterviewControl
        callStatus={callStatus}
        handleCall={handleCall}
        handleDisconnect={handleDisconnect}
        interview={interview}
        t={t}
      />
      <BackButton
        handleDisconnect={handleDisconnect}
        route="/interview"
        position="-top-9 sm:top-0 left-0 "
      />
    </div>
  );
};

export default LiveInterviewUI;
