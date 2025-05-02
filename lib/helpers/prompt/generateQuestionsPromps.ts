/**
 * Generates a prompt for generating interview questions
 * @param position - The position for which questions are being generated
 * @param difficulty - The difficulty level of the questions
 * @param stack - The technology stack for which questions are being generated
 * @param interviewType - The type of interview (e.g., behavioral, technical)
 * @param numberOfQuestions - The number of questions to generate
 * @returns The prompt for generating interview questions
 */
export const generateQuestionsPrompt = (
  position: string,
  difficulty: string,
  stack: string[],
  interviewType: string,
  numberOfQuestions: number
) => {
  return `
  You are an expert recruiter specialized in preparing realistic job interviews.
  
  Generate a list of ${numberOfQuestions} interview questions for the following role:
  - Job Title: ${position}
  - The focus between behavioural and technical questions should lean towards: ${interviewType}.
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
  `;
};
