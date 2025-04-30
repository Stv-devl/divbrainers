'use client';

import { Interview } from '@prisma/client';
import { useCallback, useEffect, useState } from 'react';
import { interviewer } from '@/constante/interviewer';
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
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastMessage, setLastMessage] = useState<string>('');

  console.log(user);

  const { _id: userId } = user;
  const { questions } = interview;
  const onCallStart = useCallback(() => {
    setCallStatus(CallStatus.ACTIVE);
  }, []);

  const onCallEnd = useCallback(() => {
    setCallStatus(CallStatus.FINISHED);
  }, []);

  const onMessage = useCallback((message: Message) => {
    if (message.type === 'transcript' && message.transcriptType === 'final') {
      const newMessage = { role: message.role, content: message.transcript };
      setMessages((prev) => [...prev, newMessage]);
    }
  }, []);

  const onSpeechStart = useCallback(() => {
    setIsSpeaking(true);
  }, []);

  const onSpeechEnd = useCallback(() => {
    setIsSpeaking(false);
  }, []);

  const onError = useCallback((error: Error) => {
    console.error('VAPI Error:', error);
    setCallStatus(CallStatus.ERROR);
  }, []);

  useEffect(() => {
    vapi.on('call-start', onCallStart);
    vapi.on('call-end', onCallEnd);
    vapi.on('message', onMessage);
    vapi.on('speech-start', onSpeechStart);
    vapi.on('speech-end', onSpeechEnd);
    vapi.on('error', onError);

    return () => {
      vapi.off('call-start', onCallStart);
      vapi.off('call-end', onCallEnd);
      vapi.off('message', onMessage);
      vapi.off('speech-start', onSpeechStart);
      vapi.off('speech-end', onSpeechEnd);
      vapi.off('error', onError);
    };
  }, [onCallStart, onCallEnd, onMessage, onSpeechStart, onSpeechEnd, onError]);

  useEffect(() => {
    if (messages.length > 0) {
      setLastMessage(messages[messages.length - 1].content);
    }

    const handleGenerateFeedback = async () => {
      console.log('generate feedback');
    };
  }, [messages]);

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);

    //test local
    /* const formattedQuestions =
      questions?.map((question: string) => `- ${question}`).join('\n') ?? '';

    await vapi.start(interviewer, {
      variableValues: {
        questions: formattedQuestions,
      },
    });*/

    const formattedQuestions =
      questions?.map((question: string) => `- ${question}`).join('\n') ?? '';

    await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
      variableValues: {
        userid: userId,
        questions: formattedQuestions,
      },
    });
  };

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  console.log('lastMessage', lastMessage);

  return {
    callStatus,
    lastMessage,
    isSpeaking,
    handleCall,
    handleDisconnect,
  };
};
