import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { handleError } from '../../helpers/errors/handleError';
import { generateFeedbackPrompt } from '../../helpers/prompt/generateFeedbacKPromps';
import { authMiddleware } from '../../middleware/authMiddleware';
import { corsMiddleware } from '../../middleware/corsMiddleware';
import { rateLimitMiddleware } from '../../middleware/rateLimitMiddleware';
import { prisma } from '../../prisma';
import { feedbackRequestSchema } from '../../shemaServer/feedback/feebackRequestShema';
import { feedbackSchema } from '../../shemaServer/feedback/feedbackShema';

/**
 * Handles the feedback generation for a mock interview
 * @param {NextRequest} req - The request object
 * @returns {Promise<NextResponse>} A promise that resolves to the response
 * @throws {Error} If the request is invalid or the feedback generation fails
 */
export async function feedbackHandler(req: NextRequest) {
  try {
    const corsResponse = corsMiddleware(req);
    if (corsResponse) return corsResponse;

    const rateLimitResponse = await rateLimitMiddleware({
      limit: 10,
      ttl: 10000,
    });
    if (rateLimitResponse) return rateLimitResponse;

    const authResponse = await authMiddleware();
    if (authResponse instanceof NextResponse) return authResponse;
    const { userId } = authResponse;

    const body = await req.json();
    const parseResult = feedbackRequestSchema.safeParse(body);

    if (!parseResult.success) {
      return handleError(400, 'Invalid request');
    }

    const { interviewId, transcript, feedbackId } = parseResult.data;

    const formattedTranscript = transcript
      .map(
        ({ role, content }: { role: string; content: string }) =>
          `- ${role}: ${content}`
      )
      .join('\n');

    const prompt = generateFeedbackPrompt(formattedTranscript);

    const { object } = await generateObject({
      model: google('gemini-2.0-flash-001', {
        structuredOutputs: false,
      }),
      schema: feedbackSchema,
      temperature: 0.8,
      prompt: prompt,
      system:
        'You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories',
    });

    if (!object) {
      throw new Error('AI feedback generation failed or did not match schema');
    }

    const feedbackData = {
      interviewId,
      userId,
      totalScore: object.totalScore,
      categoryScores: object.categoryScores,
      strengths: object.strengths.join(', '),
      areasForImprovement: object.areasForImprovement.join(', '),
      finalAssessment: object.finalAssessment,
    };

    const savedFeedback = feedbackId
      ? await prisma.feedback.update({
          where: { id: feedbackId },
          data: feedbackData,
        })
      : await prisma.feedback.create({ data: feedbackData });

    return NextResponse.json({ success: true, feedbackId: savedFeedback.id });
  } catch (error) {
    console.error('API Error in feedbackHandler:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
