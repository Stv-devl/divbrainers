import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { handleError } from '../../helpers/errors/handleError';
import { generateFeedbackPrompt } from '../../helpers/prompt/generateFeedbacKPrompt';
import { getClientIp } from '../../helpers/security/getClientIp';
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
      key: getClientIp(req),
      limit: 1,
      ttl: 10000,
      scope: 'ip',
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

    const { interviewId, transcript } = parseResult.data;

    const interview = await prisma.interview.findUnique({
      where: { id: interviewId },
    });
    if (!interview || interview.userId !== userId) {
      return handleError(403, 'Unauthorized access to interview');
    }

    const formattedTranscript = transcript
      .map(
        ({ role, content }: { role: string; content: string }) =>
          `- ${role}: ${content}`
      )
      .join('\n');

    const prompt = generateFeedbackPrompt(formattedTranscript);

    const { object } = await generateObject({
      model: google('gemini-2.0-flash-001', { structuredOutputs: false }),
      schema: feedbackSchema,
      temperature: 0.8,
      prompt,
      system:
        'You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories',
    });

    if (!object || typeof object !== 'object') {
      return handleError(500, 'AI feedback generation failed.');
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

    const existingFeedback = await prisma.feedback.findFirst({
      where: { interviewId, userId },
    });

    const savedFeedback = existingFeedback
      ? await prisma.feedback.update({
          where: { id: existingFeedback.id },
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
