/**
 * Generates a feedback prompt for an interview transcript
 * @param transcript - The transcript of the interview
 * @returns The feedback prompt
 */
export const generateFeedbackPrompt = (transcript: string) => {
  return `
          You are a senior interviewer assessing a mock interview. Analyze the candidate's performance objectively and critically, following the categories listed below. Avoid vague language and do not be overly generous—highlight any mistakes or weak areas clearly. If there are mistakes or areas for improvement, point them out.
        
          Transcript:
          ${transcript}
  
        Provide a score from 0 to 20 for each of the following categories **without adding any extra ones**:
       - **Communication Skills**: How clearly and effectively the candidate communicates, including structure and articulation.
       - **Technical Knowledge**: Depth and accuracy of technical understanding relevant to the role.
       - **Problem-Solving**: Ability to logically analyze and solve problems or case questions.
       - **Cultural & Role Fit**: How well the candidate aligns with the company's values and the job's expectations.
       - **Confidence & Clarity**: The candidate's presence, confidence, and ability to express ideas clearly.

        Based on your analysis, provide:
        1. A **total score** (0–20).
        2. A brief summary of the **candidate's strengths**.
        3. Key **areas for improvement** with clear suggestions.
        4. A **final assessment**: one paragraph summarizing your evaluation.
      
  `;
};
