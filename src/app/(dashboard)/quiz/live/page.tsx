'use client';

import { TFunction } from 'i18next';
import React, { useCallback, useEffect, useState } from 'react';
import Loading from '@/components/loading/Loading';
import LiveQuizContainer from '@/components/quiz/liveQuiz/LiveQuizContainer';
import BackButton from '@/components/ui/buttons/BackButton';
import { useClientTranslation } from '@/hooks/i18n/useClientTranslation';
import useInterviewStore from '@/store/useStoreInterview';
import { createQuiz } from '../../../../../lib/actions/quiz/createQuiz';
import { quizCheckAnswerShema } from '../../../../../lib/schema/quizCheckAnswerShema';
import { getStackShema } from '../../../../../lib/schema/stackShema';
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

  const { t, isClient } = useClientTranslation();

  const handleValidate = useCallback(() => {
    if (!currentQuestion) return;

    const result = quizCheckAnswerShema(
      currentQuestion.correctAnswer,
      t as TFunction
    ).safeParse(selectedAnswer);

    if (!result.success) {
      setError(
        result.error.errors[0]?.message || t('Quiz.liveQuiz.errors.required')
      );
      setIsCorrect(false);
    } else {
      setIsCorrect(true);
      setError('');
    }
  }, [currentQuestion, selectedAnswer, t]);

  const handleNewQuestion = useCallback(async () => {
    setIsLoading(true);
    setIsCorrect(false);
    setError('');
    setSelectedAnswer('');

    const difficulty = currentQuestion?.difficulty ?? 'junior';

    const validated = getStackShema(t as TFunction).safeParse({ stack });
    if (!validated.success) {
      setError(
        validated.error.errors[0]?.message || t('Quiz.form.errors.default')
      );
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('difficulty', difficulty);
    formData.append('stack', JSON.stringify(stack));

    const result = await createQuiz(formData);

    if (result.success) {
      sessionStorage.setItem(
        'currentQuestion',
        JSON.stringify(result.question)
      );
      setCurrentQuestion(result.question);
    } else {
      setError(result.message || 'Failed to load new question');
    }

    setIsLoading(false);
  }, [currentQuestion?.difficulty, stack, t]);

  useEffect(() => {
    const initialQuestion = getStoredQuestion();
    if (initialQuestion) setCurrentQuestion(initialQuestion);
  }, []);

  if (!currentQuestion) return null;

  if (!isClient) return null;

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
