export const generateResumeAnalysisPrompt = (resume: string) => {
  return `
    You are an assistant specialized in CV/resume parsing. Based on the raw text below, extract and return the following information in a JSON object:
    
    1. "position": the job title being sought or currently held (e.g., "Frontend Developer")
    2. "experience": number of years of professional experience **strictly in the field related to the desired position** (do not count unrelated fields)
    3. "education": the highest relevant degree or diploma related to the desired position
    4. "presentation": if a summary or personal presentation is found, return the exact text. Otherwise, return null
    5. "soft_skills": an array of soft skills (e.g., "communication", "teamwork", "problem-solving")
    6. "technical_skills": an array of technical skills (e.g., "React", "TypeScript", "Git")
    
    Guidelines:
    - Do not count years of experience in unrelated fields (e.g., construction, teaching) — only count experience relevant to the desired job title or technical stack.
    - The language of the output must match the language of the resume (including soft_skills, technical_skills, and all values).
    - Do not explain anything.
    - Do not include any markdown or code formatting.
    - If a field is missing use null.
    - Always return a valid JSON object — no explanations, no code blocks, no markdown formatting.
  
    Resume:
    ${resume}
`;
};
