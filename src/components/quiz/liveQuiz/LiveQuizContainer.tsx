'use client';

import { TFunction } from 'i18next';
import React from 'react';
import AnswerOptionList from '@/components/quiz/liveQuiz/AnswerOptionList';
import LiveQuizControl from '@/components/quiz/liveQuiz/LiveQuizControl';
import QuestionCard from '@/components/quiz/liveQuiz/QuestionCard';
import TechnicalStackWrapper from '@/components/wrappers/TechnicalStackWrapper';
import { useClientTranslation } from '@/hooks/i18n/useClientTranslation';

interface questionProps {
  question: string;
  answers: string[];
  correctAnswer: string;
}

interface LiveQuizContainerProps {
  currentQuestion: questionProps;
  handleNewQuestion: () => void;
  handleValidate: () => void;
  setSelectedAnswer: (value: string) => void;
  selectedAnswer: string;
  isCorrect: boolean;
  setIsCorrect: (value: boolean) => void;
  error: string;
  setError: (value: string) => void;
}
/**
 * Container component for the live quiz interface
 * @component
 * @param {LiveQuizContainerProps} props - Component props
 * @returns {JSX.Element} The rendered live quiz container
 */
const LiveQuizContainer: React.FC<LiveQuizContainerProps> = ({
  currentQuestion,
  handleNewQuestion,
  handleValidate,
  setSelectedAnswer,
  selectedAnswer,
  isCorrect,
  setIsCorrect,
  error,
  setError,
}) => {
  const { t, isClient } = useClientTranslation();

  if (!isClient) return null;

  return (
    <div className="space-y-5 sm:space-y-7 w-full lg:w-[90%] mx-auto">
      <h1 className="text-xl sm:text-2xl text-left sm:text-center text-blue-800 font-bold">
        {t('Quiz.titleWrapper.titleLive')}
      </h1>
      <QuestionCard
        currentQuestion={currentQuestion.question}
        t={t as TFunction}
      />
      <AnswerOptionList
        currentQuestion={currentQuestion.answers}
        selectedAnswer={selectedAnswer}
        isCorrect={isCorrect}
        setIsCorrect={setIsCorrect}
        error={error}
        setSelectedAnswer={setSelectedAnswer}
        setError={setError}
      />
      <div className="flex flex-col">
        <LiveQuizControl
          handleValidate={handleValidate}
          handleNewQuestion={handleNewQuestion}
          isCorrect={isCorrect}
          t={t as TFunction}
        />
        <div className="-ml-4 sm:ml-0">
          <TechnicalStackWrapper isCanRemove={false} />
        </div>
      </div>
    </div>
  );
};

export default LiveQuizContainer;
