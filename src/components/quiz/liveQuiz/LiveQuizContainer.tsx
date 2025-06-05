'use client';

import React from 'react';
import AnswerOptionList from '@/components/quiz/liveQuiz/AnswerOptionList';
import LiveQuizControl from '@/components/quiz/liveQuiz/LiveQuizControl';
import QuestionCard from '@/components/quiz/liveQuiz/QuestionCard';
import TechnicalStackWrapper from '@/components/wrappers/TechnicalStackWrapper';
import { Question } from '@/service/quiz/startQuizSession';

interface LiveQuizContainerProps {
  currentQuestion: Question;
  handleNewQuestion: () => void;
  handleValidate: () => void;
  setSelectedAnswer: (value: string) => void;
  selectedAnswer: string;
  isCorrect: boolean;
  setIsCorrect: (value: boolean) => void;
  error: string;
  setError: (value: string) => void;
}

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
  return (
    <div className="space-y-5 sm:space-y-7 w-full lg:w-[90%] mx-auto">
      <h1 className="text-xl sm:text-2xl text-left sm:text-center text-blue-800 font-bold">
        Let's training with quiz game
      </h1>
      <QuestionCard currentQuestion={currentQuestion.question} />
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
        />
        <div className="-ml-4 sm:ml-0">
          <TechnicalStackWrapper isCanRemove={false} />
        </div>
      </div>
    </div>
  );
};

export default LiveQuizContainer;
