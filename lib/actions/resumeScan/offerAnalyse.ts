'use server';

import { getUserData } from '../../helpers/data/getUserData';
import { parseJsonSafely } from '../../helpers/data/parseJsonSafely';
import { handleServerActionError } from '../../helpers/errors/handleServerActionError';
import { askAI } from '../../helpers/fileOperations/askAI';
import { generateOfferAnalysisPrompt } from '../../helpers/prompt/scan/generateOfferAnalysisPrompt';
import { generateSkillsListPrompt } from '../../helpers/prompt/scan/generateSkillsListPrompt';
import { getCurrentSession } from '../../helpers/security/getCurrentSession';
import { jobOfferSchema } from '../../schema/jobOfferShema';

export async function offerAnalyse(resumeValue: string) {
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

    const [rawSkills, rawOfferAnalyse] = await Promise.all([
      askAI(generateSkillsListPrompt(result.data.jobOffer), 0.3),
      askAI(generateOfferAnalysisPrompt(result.data.jobOffer), 0.3),
    ]);

    if (!rawSkills || !rawOfferAnalyse) {
      throw new Error('AI failed to generate skills list or offer analysis');
    }

    const skills = parseJsonSafely(
      rawSkills,
      'Generated skills list are not in valid JSON format'
    );

    return { skills, rawOfferAnalyse };
  } catch (error) {
    throw handleServerActionError(500, 'An unexpected error occurred');
  }
}
