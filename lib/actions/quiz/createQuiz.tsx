'use server';

import { getUserData } from '../../helpers/data/getUserData';
import { handleServerActionError } from '../../helpers/errors/handleServerActionError';
import { askAI } from '../../helpers/fileOperations/askAI';
import { generateQuizQuestionPrompt } from '../../helpers/prompt/quiz/generateQuizQuestionPrompt';
import { getCurrentSession } from '../../helpers/security/getCurrentSession';
import { CreateQuizSchema } from '../../shemaServer/quiz/createQuizShema';
import { sanitizeJsonString } from '../../utils/sanitizeJsonString';

/**
 * Creates a quiz question based on the provided form data
 * @param {FormData} formData - The form data containing difficulty and stack information
 * @returns  The result of the quiz creation
 * @throws {Error} If there's an error during quiz creation
 */
export async function createQuiz(formData: FormData) {
  try {
    const session = await getCurrentSession();

    const difficulty = formData.get('difficulty') as string;
    const rawStack = formData.get('stack');
    const lang = (formData.get('lang') as string) === 'fr' ? 'fr' : 'en';

    const stack = typeof rawStack === 'string' ? JSON.parse(rawStack) : [];

    const result = CreateQuizSchema.safeParse({ difficulty, stack });
    if (!result.success) {
      throw handleServerActionError(400, result.error.issues[0].message);
    }

    const userData = await getUserData(session.user.id);
    if (!userData) {
      throw handleServerActionError(404, 'User data not found');
    }
    const randomStack = stack[Math.floor(Math.random() * stack.length)];

    const quizQuestionRaw = await askAI(
      generateQuizQuestionPrompt(difficulty, [randomStack], lang),
      1
    );

    let quizQuestion;
    try {
      quizQuestion = JSON.parse(sanitizeJsonString(quizQuestionRaw));
      quizQuestion = JSON.parse(JSON.stringify(quizQuestion));
    } catch (e) {
      return {
        success: false,
        message: 'Failed to parse AI response',
      };
    }

    return {
      success: true,
      message: 'Question processed successfully',
      question: quizQuestion,
    };
  } catch (error) {
    throw handleServerActionError(500, 'An unexpected error occurred');
  }
}
