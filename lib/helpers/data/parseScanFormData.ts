import { NextRequest } from 'next/server';
import { scanSchema } from '../../shemaServer/scanShema';
import { handleError } from '../errors/handleError';

/**
 * Parses and validates the form data from a scan request
 * @param {NextRequest} req - The incoming request object containing form data
 * @returns {Promise<{resumeFile: File, keywords: string[], analizeJobOffer: string, lang: 'fr' | 'en'} | NextResponse>} The parsed and validated form data or an error response
 */
export async function parseScanFormData(req: NextRequest) {
  const formData = await req.formData();

  const resumeFile = formData.get('resume');
  const rawKeywords = formData.get('keywords');
  const rawOffer = formData.get('analizeJobOffer');
  const rawLang = formData.get('lang');

  if (!(resumeFile instanceof File)) {
    return handleError(400, 'Missing or invalid resume file');
  }

  if (resumeFile.size > 5 * 1024 * 1024) {
    return handleError(413, 'PDF too large (max 5MB)');
  }

  const isPdfMime = resumeFile.type === 'application/pdf';
  const isPdfName = resumeFile.name.toLowerCase().endsWith('.pdf');

  if (!isPdfMime || !isPdfName) {
    return handleError(400, 'Invalid file type: only PDF files are allowed');
  }

  let keywords: string[];
  try {
    keywords = JSON.parse(rawKeywords as string);
  } catch {
    return handleError(400, 'Invalid keywords format');
  }

  const result = scanSchema.safeParse({
    resumeFile,
    keywords,
    analizeJobOffer: rawOffer,
    lang: rawLang,
  });

  if (!result.success) {
    const msg =
      Object.values(result.error.flatten().fieldErrors)[0]?.[0] ||
      'Invalid input';
    return handleError(400, msg);
  }

  return result.data;
}
