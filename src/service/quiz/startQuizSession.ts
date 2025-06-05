import { createQuiz } from '../../../lib/actions/quiz/createQuiz';

export interface Question {
  id: number;
  question: string;
  answers: string[];
  correctAnswer: string;
  difficulty: string;
}

export interface LiveMockProps {
  questions: Question[];
}

const liveMock: { success: true; quiz: LiveMockProps } = {
  success: true,
  quiz: {
    questions: [
      {
        id: 1,
        question:
          'What is the main difference between useEffect and useLayoutEffect in React?',
        answers: [
          'UseEffect runs before component render, useLayoutEjffect after',
          'UseEffect is synchronous, useLayoutEffect is asynchronous',
          'UseLayoutEffect runs before browser paint, useEffect after',
          'UseLayoutEffect does not depend on DOM, unlike useEffect',
        ],
        correctAnswer:
          'UseLayoutEffect runs before browser paint, useEffect after',
        difficulty: 'junior',
      },
    ],
  },
};

export const startQuizSession = async (difficulty: string, stack: string[]) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // const response = await createQuiz(difficulty, stack);
    const response = liveMock;

    if (!response.success) {
      return { success: false, message: 'Serveur error occurred' };
    }

    const question = response.quiz.questions?.[0];
    if (question) {
      sessionStorage.setItem('currentQuestion', JSON.stringify(question));
    }

    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, message: 'Unexpected error while creating quiz' };
  }
};
