import { CreateAssistantDTO } from '@vapi-ai/web/dist/api';

export const interviewer: CreateAssistantDTO = {
  name: 'Interviewer',
  firstMessage: `Hello {{name}}! Thank you for taking the time to speak with me today. You're here to interview for the position of {{position}}. To get started, could you tell me a bit about your experience related to this role?`,
  firstMessageInterruptionsEnabled: true,
  firstMessageMode: 'assistant-speaks-first',
  transcriber: {
    provider: 'deepgram',
    model: 'nova-2',
    language: 'en',
  },
  voice: {
    provider: '11labs',
    voiceId: 'sarah',
    stability: 0.4,
    similarityBoost: 0.8,
    speed: 0.85,
    style: 0.5,
    useSpeakerBoost: true,
  },
  model: {
    provider: 'openai',
    model: 'gpt-4',
    temperature: 0.9,
    emotionRecognitionEnabled: true,
    messages: [
      {
        role: 'system',
        content: `
        You are a friendly and professional voice interviewer named "Interviewer". You're speaking with {{name}}, who is interviewing for the position of {{position}}.
        
        Your tone should be warm, respectful, and human-like, not robotic.
        
        Your job:
        - Welcome the candidate and thank them.
        - Ask the provided questions one at a time: {{questions}}.
        - Pause after each question, and allow at least 3 to 5 seconds for the candidate to speak.
        - If they don’t answer within 8 seconds, gently say: "Are you still with me?"
        - If still no answer after 30 seconds, say: "I’ll go ahead and end the interview for now. Thank you for your time." Then end the call.
        - Adapt your follow-ups based on their experience level.
        - Don't need to repeat the answer of the candidate.
        - If they ask about the job, respond briefly or refer them to HR.
        - If they say something disrespectful or inappropriate, kindly end the interview immediately.
        - Finish with a warm thank-you and goodbye.
        `.trim(),
      },
    ],
  },
  stopSpeakingPlan: {
    numWords: 0,
    voiceSeconds: 0.3,
    backoffSeconds: 1,
    acknowledgementPhrases: ['got it', 'okay', 'yes', 'right', 'mhmm'],
    interruptionPhrases: ['stop', 'wait', 'pause', 'hold on', 'no'],
  },

  silenceTimeoutSeconds: 30,
  maxDurationSeconds: 1800,

  endCallMessage:
    'Thanks again for your time, {{name}}. I’ll be in touch soon about the job. Talk to you soon!',
  endCallPhrases: ['goodbye', 'thank you for your time', 'end the interview'],

  messagePlan: {
    idleMessages: [
      'Are you still with me?',
      'Take your time. I’m here whenever you’re ready.',
    ],
    idleTimeoutSeconds: 8,
    idleMessageMaxSpokenCount: 2,
    idleMessageResetCountOnUserSpeechEnabled: true,
    silenceTimeoutMessage:
      "It seems you've gone quiet. I'll end the interview for now. Thank you!",
  },

  startSpeakingPlan: {
    waitSeconds: 0.5,
    transcriptionEndpointingPlan: {
      onPunctuationSeconds: 0.5,
      onNoPunctuationSeconds: 2.5,
      onNumberSeconds: 1,
    },
  },

  artifactPlan: {
    recordingEnabled: true,
    recordingFormat: 'wav;l16',
    transcriptPlan: {
      enabled: true,
      assistantName: 'Interviewer',
      userName: '{{name}}',
    },
    pcapEnabled: true,
  },
};
