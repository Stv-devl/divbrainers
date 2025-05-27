import pdfParse from 'pdf-parse';

export type FormDataFile = {
  name: string;
  type: string;
  arrayBuffer: () => Promise<ArrayBuffer>;
};

/**
 * Extracts text from a PDF file
 * @param file - The PDF file to extract text from
 * @returns The extracted text or an error response
 */
export async function extractTextFromPdfFile(
  file: FormDataFile
): Promise<{ text?: string; error?: string; status?: number }> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const pdfData = await pdfParse(buffer);

    if (!pdfData.text) {
      return {
        error:
          'The PDF was parsed but contains no readable text. Please use a PDF with extractable text (not scanned images).',
        status: 422,
      };
    }

    return { text: pdfData.text };
  } catch (error) {
    return {
      error: 'Failed to parse the resume PDF. Please upload a valid PDF.',
      status: 422,
    };
  }
}
