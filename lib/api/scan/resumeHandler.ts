import { NextRequest, NextResponse } from 'next/server';
import { parseScanFormData } from '../../helpers/data/parseScanFormData';
import { handleError } from '../../helpers/errors/handleError';
import { askAI } from '../../helpers/fileOperations/askAI';
import { extractTextFromPdfFile } from '../../helpers/fileOperations/pdfHandler';
import { generateOfferAnalysisPrompt } from '../../helpers/prompt/generateOfferAnalysisPrompt';
import { generateResumeAnalysisPrompt } from '../../helpers/prompt/generateResumeAnalysisPrompt';
import { generateResumeFeedbackPrompt } from '../../helpers/prompt/generateResumeFeedbackPrompt';
import { getClientIp } from '../../helpers/security/getClientIp';
import { sanitizeInput } from '../../helpers/security/sanitizeInput';
import { authMiddleware } from '../../middleware/authMiddleware';
import { corsMiddleware } from '../../middleware/corsMiddleware';
import { rateLimitMiddleware } from '../../middleware/rateLimitMiddleware';

export async function resumeHandler(req: NextRequest) {
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

    const parsed = await parseScanFormData(req);
    if (parsed instanceof NextResponse) return parsed;

    const { resumeFile, keywords: validKeywords, formatedJobOffer } = parsed;
    const offer = sanitizeInput(formatedJobOffer);

    const offerAnalysis = await askAI(
      generateOfferAnalysisPrompt(offer, validKeywords),
      0.7
    );
    const pdfResult = await extractTextFromPdfFile(resumeFile);

    if (pdfResult.error) {
      return handleError(pdfResult.status || 422, pdfResult.error);
    }

    const pdfData = pdfResult.text!;

    const resumeAnalysis = await askAI(
      generateResumeAnalysisPrompt(pdfData),
      0.7
    );

    const feedback = await askAI(
      generateResumeFeedbackPrompt(
        resumeAnalysis,
        offerAnalysis,
        validKeywords
      ),
      0.7
    );

    return NextResponse.json({
      success: true,
      message: 'Resume processed successfully',
      feedback,
    });
  } catch (error) {
    console.error('API Error in feedbackHandler:', error);
    return handleError(500, 'Internal Server Error');
  }
}
