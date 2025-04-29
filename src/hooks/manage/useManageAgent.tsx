'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
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

/**
 * Interface for VAPI messages received during the call.
 */
interface VapiMessage {
  type: string;
  transcriptType?: string;
  transcript?: string;
}

const CONNECTION_TIMEOUT_MS = 15000;
/**
 * Hook to manage the live AI interview session using VAPI.
 * Handles call status, transcription, speech events, errors, and timeouts.
 * @returns An object with call state, last message, loading/error states, and controls to start/stop the interview.
 */
export const useInterviewAgent = () => {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [lastMessage, setLastMessage] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connectionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const retryAttemptedRef = useRef(false);

  const isInterviewActive = callStatus === CallStatus.ACTIVE;
  /**
   * Clears the connection timeout safely.
   */
  const safeClearTimeout = () => {
    if (connectionTimeoutRef.current) {
      clearTimeout(connectionTimeoutRef.current);
      connectionTimeoutRef.current = null;
    }
  };

  /**
   * Starts a connection timeout to automatically fail if connection takes too long.
   */
  const startConnectionTimeout = () => {
    safeClearTimeout();
    connectionTimeoutRef.current = setTimeout(() => {
      setError('Connection timed out. Please try again.');
      setCallStatus(CallStatus.ERROR);
      setIsLoading(false);
    }, CONNECTION_TIMEOUT_MS);
  };

  /**
   * Resets the retry attempt flag after a successful connection.
   */
  const resetRetry = () => {
    retryAttemptedRef.current = false;
  };

  /**
   * Handler when the call successfully starts.
   */
  const handleCallStart = () => {
    safeClearTimeout();
    setCallStatus(CallStatus.ACTIVE);
    setIsLoading(false);
    resetRetry();
  };

  /**
   * Handler when the call ends normally.
   */
  const handleCallEnd = () => {
    safeClearTimeout();
    setCallStatus(CallStatus.FINISHED);
  };

  /**
   * Handler for incoming VAPI messages (transcriptions).
   * @param message The VAPI message object
   */
  const handleMessage = (message: VapiMessage) => {
    if (
      message.type === 'transcript' &&
      message.transcriptType === 'final' &&
      message.transcript
    ) {
      setLastMessage(message.transcript);
    }
  };

  /**
   * Handler for speech start events (when the AI starts talking).
   */
  const handleSpeechStart = () => setIsSpeaking(true);

  /**
   * Handler for speech end events (when the AI stops talking).
   */
  const handleSpeechEnd = () => setIsSpeaking(false);

  /**
   * General error handler for VAPI errors.
   * @param err The error encountered
   */
  const handleError = (err: Error) => {
    console.error('VAPI error:', err);
    safeClearTimeout();
    setError('An unexpected error occurred.');
    setCallStatus(CallStatus.ERROR);
    setIsLoading(false);
  };

  // Bind VAPI events on mount
  useEffect(() => {
    vapi.on('call-start', handleCallStart);
    vapi.on('call-end', handleCallEnd);
    vapi.on('message', handleMessage);
    vapi.on('speech-start', handleSpeechStart);
    vapi.on('speech-end', handleSpeechEnd);
    vapi.on('error', handleError);

    return () => {
      vapi.off('call-start', handleCallStart);
      vapi.off('call-end', handleCallEnd);
      vapi.off('message', handleMessage);
      vapi.off('speech-start', handleSpeechStart);
      vapi.off('speech-end', handleSpeechEnd);
      vapi.off('error', handleError);
      safeClearTimeout();
    };
  }, []);

  /**
   * Starts the interview session by connecting to VAPI.
   * Includes automatic retry on failure.
   */
  const startInterview = useCallback(async () => {
    if (
      callStatus === CallStatus.CONNECTING ||
      callStatus === CallStatus.ACTIVE
    ) {
      console.warn('Interview already started or connecting.');
      return;
    }

    try {
      setCallStatus(CallStatus.CONNECTING);
      setIsLoading(true);
      setError(null);

      startConnectionTimeout();
      await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!);
    } catch (err) {
      console.error('Failed to start interview:', err);

      if (!retryAttemptedRef.current) {
        console.log('Retrying connection...');
        retryAttemptedRef.current = true;
        await startInterview();
      } else {
        safeClearTimeout();
        setError('Failed to start interview after retry.');
        setCallStatus(CallStatus.ERROR);
        setIsLoading(false);
      }
    }
  }, [callStatus]);

  /**
   * Stops the interview session if active or connecting.
   */
  const stopInterview = useCallback(() => {
    if (
      callStatus !== CallStatus.ACTIVE &&
      callStatus !== CallStatus.CONNECTING
    )
      return;

    vapi.stop();
    safeClearTimeout();
    setCallStatus(CallStatus.FINISHED);
    setIsLoading(false);
  }, [callStatus]);

  return {
    callStatus,
    lastMessage,
    isSpeaking,
    isLoading,
    error,
    startInterview,
    stopInterview,
    isInterviewActive,
  };
};
