import { Question } from '@/service/quiz/startQuizSession';

export const getStoredQuestion = (): Question | null => {
  const stored = sessionStorage.getItem('currentQuestion');
  if (!stored) return null;
  try {
    return JSON.parse(stored) as Question;
  } catch (error) {
    console.error(
      'Failed to parse currentQuestion from sessionStorage:',
      error
    );
    return null;
  }
};
