'use server';

import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { getUserData } from '../../helpers/data/getUserData';
import { parseJsonSafely } from '../../helpers/data/parseJsonSafely';
import { handleServerActionError } from '../../helpers/errors/handleServerActionError';
import { generateSkillsListPrompt } from '../../helpers/prompt/generateSkillsListPrompt';
import { getCurrentSession } from '../../helpers/security/getCurrentSession';
import { jobOfferSchema } from '../../schema/jobOfferShema';

export async function findSkills(resumeValue: string) {
  try {
    const session = await getCurrentSession();

    const result = jobOfferSchema.safeParse({ jobOffer: resumeValue });
    if (!result.success) {
      handleServerActionError(400, result.error.issues[0].message);
    }

    const userData = await getUserData(session.user.id);
    if (!userData) {
      throw handleServerActionError(404, 'User data not found');
    }

    const prompt = generateSkillsListPrompt(result.data.jobOffer);

    const { text: rawSkills } = await generateText({
      model: google('gemini-2.0-flash-001'),
      prompt,
      temperature: 0.7,
    });

    if (!rawSkills) {
      throw handleServerActionError(400, 'AI failed to generate questions');
    }

    const skills = parseJsonSafely(
      rawSkills,
      'Generated questions are not in valid JSON format'
    );

    return skills;
  } catch (error) {
    throw handleServerActionError(500, 'An unexpected error occurred');
  }
}
