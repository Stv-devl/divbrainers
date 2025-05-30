import { NextRequest, NextResponse } from 'next/server';
import { parseScanFormData } from '../../helpers/data/parseScanFormData';
import { handleError } from '../../helpers/errors/handleError';
import { askAI } from '../../helpers/fileOperations/askAI';
import { extractTextFromPdfFile } from '../../helpers/fileOperations/pdfHandler';
import { generateResumeFeedbackPrompt } from '../../helpers/prompt/scan/generateResumeFeedbackPrompt';
import { getClientIp } from '../../helpers/security/getClientIp';
import { authMiddleware } from '../../middleware/authMiddleware';
import { corsMiddleware } from '../../middleware/corsMiddleware';
import { rateLimitMiddleware } from '../../middleware/rateLimitMiddleware';
import { sanitizeJsonString } from '../../utils/sanitizeJsonString';

/**
 * Handles the resume analysis request
 * @param {NextRequest} req - The incoming request object
 * @returns {Promise<NextResponse>} The response containing the analysis results
 * @throws {Error} If there's an error during processing
 */
export async function resumeHandler(req: NextRequest) {
  try {
    const corsResponse = corsMiddleware(req);
    if (corsResponse) return corsResponse;

    const rateLimitResponse = await rateLimitMiddleware({
      key: getClientIp(req),
      limit: 10,
      ttl: 10000,
      scope: 'ip',
    });

    if (rateLimitResponse) return rateLimitResponse;
    const authResponse = await authMiddleware();
    if (authResponse instanceof NextResponse) return authResponse;

    const parsed = await parseScanFormData(req);
    if (parsed instanceof NextResponse) return parsed;

    const { resumeFile, keywords: validKeywords, analizeJobOffer } = parsed;
    const pdfResult = await extractTextFromPdfFile(resumeFile);

    if (pdfResult.error) {
      return handleError(pdfResult.status || 422, pdfResult.error);
    }

    const pdfData = pdfResult.text!;

    const feedbackRaw = await askAI(
      generateResumeFeedbackPrompt(pdfData, analizeJobOffer, validKeywords),
      0.7
    );

    const feedback = JSON.parse(sanitizeJsonString(feedbackRaw));

    return NextResponse.json({
      success: true,
      message: 'Resume processed successfully',
      feedback,
    });
  } catch (error) {
    console.error('API Error in resumeHandler:', error);
    return handleError(500, 'Internal Server Error');
  }
}
