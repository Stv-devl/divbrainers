'use server';

import { google } from '@ai-sdk/google';
import { Prisma } from '@prisma/client';
import { generateText } from 'ai';
import { getUserData } from '../../helpers/data/getUserData';
import { parseInterviewFormData } from '../../helpers/data/parseInterviewFormData';
import { parseJsonSafely } from '../../helpers/data/parseJsonSafely';
import { handleServerActionError } from '../../helpers/errors/handleServerActionError';
import { generateQuestionsPrompt } from '../../helpers/prompt/generateQuestionsPrompt';
import { getCurrentSession } from '../../helpers/security/getCurrentSession';
import { prisma } from '../../prisma';

export async function createInterview(formData: FormData) {
  try {
    const session = await getCurrentSession();
    const input = parseInterviewFormData(formData);

    const userData = await getUserData(session.user.id);
    if (!userData) {
      throw handleServerActionError(404, 'User data not found');
    }

    const prompt = generateQuestionsPrompt(
      input.position,
      input.difficulty,
      input.stack,
      input.interviewType,
      input.numberOfQuestions
    );

    const { text: rawQuestions } = await generateText({
      model: google('gemini-2.0-flash-001'),
      prompt,
      temperature: 0.8,
    });
    if (!rawQuestions) {
      throw handleServerActionError(400, 'AI failed to generate questions');
    }

    const questions = parseJsonSafely(
      rawQuestions,
      'Generated questions are not in valid JSON format'
    );

    const newInterview = await prisma.interview.create({
      data: {
        userId: userData.id,
        ...input,
        questions: questions as Prisma.InputJsonValue,
      },
    });

    return newInterview;
  } catch (error) {
    throw handleServerActionError(500, 'An unexpected error occurred');
  }
}
