import { TFunction } from 'i18next';
import { z } from 'zod';

export const quizCheckAnswerShema = (correctAnswer: string, t: TFunction) =>
  z
    .string({
      required_error: t('Quiz.liveQuiz.errors.required'),
      invalid_type_error: t('Quiz.liveQuiz.errors.invalidType'),
    })
    .min(1, t('Quiz.liveQuiz.errors.required'))
    .refine((value) => value === correctAnswer, {
      message: t('Quiz.liveQuiz.errors.incorrect'),
    });
