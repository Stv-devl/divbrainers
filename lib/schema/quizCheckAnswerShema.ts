import { z } from 'zod';

export const quizCheckAnswerShema = (correctAnswer: string) =>
  z
    .string({
      required_error: 'You must choose an answer.',
      invalid_type_error: 'The answer must be a string.',
    })
    .min(1, 'You must choose an answer.')
    .refine((value) => value === correctAnswer, {
      message: 'Incorrect answer, please try again.',
    });
