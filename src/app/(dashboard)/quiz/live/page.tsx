'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Loading from '@/components/loading/Loading';
import LiveQuizContainer from '@/components/quiz/liveQuiz/LiveQuizContainer';
import BackButton from '@/components/ui/buttons/BackButton';
import { startQuizSession } from '@/service/quiz/startQuizSession';
import useInterviewStore from '@/store/useStoreInterview';
import { quizCheckAnswerShema } from '../../../../../lib/schema/quizCheckAnswerShema';
import { getStoredQuestion } from '../../../../../lib/utils/getStoredQuestion';

type Question = {
  id: number;
  question: string;
  answers: string[];
  correctAnswer: string;
  difficulty: string;
};

const Page = () => {
  const { stack } = useInterviewStore();
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleValidate = useCallback(() => {
    if (!currentQuestion) return;

    const result = quizCheckAnswerShema(
      currentQuestion.correctAnswer
    ).safeParse(selectedAnswer);

    if (!result.success) {
      setError(result.error.errors[0].message);
      setIsCorrect(false);
    } else {
      setIsCorrect(true);
      setError('');
    }
  }, [currentQuestion, selectedAnswer]);

  const handleNewQuestion = useCallback(async () => {
    setIsLoading(true);
    setIsCorrect(false);
    setError('');
    setSelectedAnswer('');

    const difficulty = currentQuestion?.difficulty ?? 'junior';
    const result = await startQuizSession(difficulty, stack);

    if (result.success) {
      const nextQuestion = getStoredQuestion();
      if (nextQuestion) setCurrentQuestion(nextQuestion);
    }

    setIsLoading(false);
  }, [currentQuestion?.difficulty, stack]);

  useEffect(() => {
    const initialQuestion = getStoredQuestion();
    if (initialQuestion) setCurrentQuestion(initialQuestion);
  }, []);

  if (!currentQuestion) return null;

  return (
    <div className="relative">
      <LiveQuizContainer
        currentQuestion={currentQuestion}
        handleNewQuestion={handleNewQuestion}
        handleValidate={handleValidate}
        selectedAnswer={selectedAnswer}
        setSelectedAnswer={setSelectedAnswer}
        isCorrect={isCorrect}
        setIsCorrect={setIsCorrect}
        error={error}
        setError={setError}
      />
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/40 backdrop-blur-sm">
          <Loading value="Generating question..." />
        </div>
      )}
      <BackButton route="/quiz" position="-top-10 sm:top-1 left-0 sm:left-1" />
    </div>
  );
};

export default Page;
