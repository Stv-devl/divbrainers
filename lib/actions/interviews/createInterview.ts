'use server';

import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { handleServerActionError } from '../../helpers/errors/handleServerActionError';
import { getCurrentSession } from '../../helpers/security/getCurrentSession';
import { prisma } from '../../prisma';
import { interviewSchema } from '../../shemaServer/interviewShema';

/**
 * Add a new user interview
 * @param formData - The form data containing interview details
 * @returns The newly created interview
 */
export async function createInterview(formData: FormData) {
  const session = await getCurrentSession();

  const position = formData.get('position') as string;
  const difficulty = formData.get('difficulty') as string;
  const interviewType = formData.get('interviewType') as string;
  const numberOfQuestions = formData.get('numberOfQuestions') as string;
  const stackRaw = formData.get('stack') as string;
  const stack = JSON.parse(stackRaw) as string[];

  const validationResult = interviewSchema.safeParse({
    position,
    difficulty,
    interviewType,
    numberOfQuestions,
    stack,
  });

  if (!validationResult.success) {
    handleServerActionError(
      400,
      validationResult.error.issues[0]?.message || 'Invalid input data'
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { dataId: true },
  });

  if (!user?.dataId) {
    throw handleServerActionError(404, 'User data not found');
  }

  //preciser si l'utilisateur n'a pas d'experience pas besoin de poser des questions sur sont xp, dans front proposer une interview pour 0xp ?
  const { text: questions } = await generateText({
    model: google('gemini-2.0-flash-001'),
    prompt: `
  You are an expert recruiter specialized in preparing realistic job interviews.
  
  Generate a list of ${numberOfQuestions} interview questions for the following role:
  - Job Title: ${position}
  - Seniority Level: ${difficulty}
  - Tech Stack: ${stack.join(', ')}
  - Language: English
  
  Guidelines:
  - The questions should focus primarily on ${interviewType} aspects.
  - Questions must be short, clear, and sound natural when spoken aloud.
  - Avoid using special characters like "/", "*", icons, or any formatting that could disrupt a voice assistant.
  - Do not add any introductory or concluding text, only the list of questions.
  - Return the questions **strictly** as a valid JSON array of strings, 
  - Do not use any Markdown formatting like \`\`\`json or \`\`\`. for example:
    ["Question 1", "Question 2", "Question 3"]

  Important:
  - Output only the JSON array, no extra text, no code blocks, no formatting.
  `,
  });

  if (!questions) {
    throw handleServerActionError(400, 'No questions generated');
  }

  console.log(questions);

  const newInterview = await prisma.interview.create({
    data: {
      dataId: user.dataId,
      position,
      difficulty,
      interviewType,
      numberOfQuestions: parseInt(numberOfQuestions),
      questions: JSON.parse(questions),
      stack,
      score: null,
    },
  });

  return newInterview;
}
