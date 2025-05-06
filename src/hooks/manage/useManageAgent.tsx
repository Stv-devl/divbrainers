'use client';

import { Interview } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { interviewer } from '@/constante/interviewer';
import postFeedback from '@/service/postFeedback';
import { UserProfile } from '@/types/type';
import { vapi } from '../../../lib/vapi.sdk';

/**
 * Possible call statuses during the interview.
 */
export enum CallStatus {
  INACTIVE = 'INACTIVE',
  CONNECTING = 'CONNECTING',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
  STOPPED = 'STOPPED',
  GENERATING_FEEDBACK = 'GENERATING_FEEDBACK',
  ERROR = 'ERROR',
}

interface SavedMessage {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * Hook to manage the live AI interview session using VAPI.
 * Handles call status, transcription, speech events, errors, and timeouts.
 * @returns An object with call state, last message, loading/error states, and controls to start/stop the interview.
 */
export const useInterviewAgent = (user: UserProfile, interview: Interview) => {
  const router = useRouter();
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastMessage, setLastMessage] = useState<string>('');

  const wasManuallyStopped = useRef(false);
  const isMounted = useRef(true);

  const { _id: userId, name } = user;
  const { questions, position } = interview;

  const formattedQuestions = useMemo(
    () =>
      (questions as string[])
        ?.map((question: string) => `- ${question}`)
        .join('\n') ?? '',
    [questions]
  );

  const onCallStart = useCallback(() => {
    setCallStatus(CallStatus.ACTIVE);
  }, []);

  const onCallEnd = useCallback(() => {
    if (!wasManuallyStopped.current) {
      setCallStatus(CallStatus.FINISHED);
    }
  }, []);

  const onSpeechStart = useCallback(() => {
    setIsSpeaking(true);
  }, []);

  const onSpeechEnd = useCallback(() => {
    setIsSpeaking(false);
  }, []);

  const onMessage = useCallback((message: Message) => {
    if (
      message.type === 'transcript' &&
      message.transcriptType === 'final' &&
      message.role === 'assistant'
    ) {
      const newMessage = { role: message.role, content: message.transcript };
      setMessages((prev) => [...prev, newMessage]);
      setLastMessage(message.transcript);
    }
  }, []);

  const onError = useCallback((error: Error) => {
    console.error('VAPI Error:', error);
    setCallStatus(CallStatus.ERROR);
  }, []);

  useEffect(() => {
    isMounted.current = true;

    vapi.on('call-start', onCallStart);
    vapi.on('call-end', onCallEnd);
    vapi.on('message', onMessage);
    vapi.on('speech-start', onSpeechStart);
    vapi.on('speech-end', onSpeechEnd);
    vapi.on('error', onError);

    return () => {
      isMounted.current = false;
      vapi.off('call-start', onCallStart);
      vapi.off('call-end', onCallEnd);
      vapi.off('message', onMessage);
      vapi.off('speech-start', onSpeechStart);
      vapi.off('speech-end', onSpeechEnd);
      vapi.off('error', onError);
    };
  }, [onCallStart, onCallEnd, onMessage, onSpeechStart, onSpeechEnd, onError]);

  useEffect(() => {
    const sendFeedbackToServer = async () => {
      if (
        callStatus === CallStatus.FINISHED &&
        messages.length > 0 &&
        interview?.id &&
        userId
      ) {
        try {
          setCallStatus(CallStatus.GENERATING_FEEDBACK);
          const response = await postFeedback(interview.id, messages);

          if (!response.success) {
            console.error('Failed to create feedback');
          } else {
            console.log('Feedback created:', response.feedbackId);
            if (isMounted.current) {
              router.push(
                `/interview/live/${interview.id}/feedback/${response.feedbackId}`
              );
            }
          }
        } catch (error) {
          console.error('Error sending feedback:', error);
        }
      }
    };

    sendFeedbackToServer();
  }, [callStatus, messages, interview?.id, userId, router]);

  const handleCall = async () => {
    if (callStatus !== CallStatus.INACTIVE) return;
    setCallStatus(CallStatus.CONNECTING);
    wasManuallyStopped.current = false;

    await vapi.start(interviewer, {
      variableValues: {
        name: name ?? '',
        position: position,
        questions: formattedQuestions,
      },
    });

    /*
   //alternative with workflow (to fix)
    const formattedQuestions =
      questions?.map((question: string) => `- ${question}`).join('\n') ?? '';
    await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
      variableValues: {
        userid: userId,
        questions: formattedQuestions,
      },
    });*/
  };

  const handleDisconnect = () => {
    wasManuallyStopped.current = true;
    setCallStatus(CallStatus.STOPPED);
    vapi.stop();
  };

  return {
    callStatus,
    lastMessage,
    isSpeaking,
    handleCall,
    handleDisconnect,
  };
};
