'use server';

import { getUserData } from '../../helpers/data/getUserData';
import { parseJsonSafely } from '../../helpers/data/parseJsonSafely';
import { handleServerActionError } from '../../helpers/errors/handleServerActionError';
import { askAI } from '../../helpers/fileOperations/askAI';
import { generateOfferAnalysisPrompt } from '../../helpers/prompt/scan/generateOfferAnalysisPrompt';
import { generateSkillsListPrompt } from '../../helpers/prompt/scan/generateSkillsListPrompt';
import { getCurrentSession } from '../../helpers/security/getCurrentSession';
import { jobOfferSchema } from '../../schema/jobOfferShema';

/**
 * Analyzes a job offer to extract skills and provide analysis
 * @param {string} resumeValue - The job offer text to analyze
 * @returns {Promise<{skills: any, rawOfferAnalyse: string}>} Object containing extracted skills and offer analysis
 * @throws {Error} If validation fails, user data is not found, or AI generation fails
 */
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
