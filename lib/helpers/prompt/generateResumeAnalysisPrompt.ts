export const generateResumeAnalysisPrompt = (resume: string) => {
  return `
    You are an assistant specialized in CV/resume parsing. Based on the raw text below, extract and return the following information in a JSON object:
    
    1. "address": the geographical location (city + country if available)
    2. "phone": the phone number (preferably in international format)
    3. "Email": the email of the user
    3. "position": the job title being sought or currently held (e.g., "Frontend Developer")
    4. "experience": number of years of professional experience **strictly in the field related to the desired position** (do not count unrelated fields)
    5. "education": the highest relevant degree or diploma related to the desired position
    6. "presentation": if a summary or personal presentation is found, return the exact text. Otherwise, return null
    7. "soft_skills": an array of soft skills (e.g., "communication", "teamwork", "problem-solving")
    8. "technical_skills": an array of technical skills (e.g., "React", "TypeScript", "Git")

    
    Guidelines:
    - Do not count years of experience in unrelated fields (e.g., construction, teaching) — only count experience relevant to the desired job title or technical stack.
    - The language of the output must match the language of the resume (including soft_skills, technical_skills, and all values).
    - Do not explain anything.
    - Do not include any markdown or code formatting.
    - If a field is missing use null.
    - Always return a valid JSON object — no explanations, no code blocks, no markdown formatting.
    
  Expected output example:
{
  "address": "Paris - France",
  "phone": "+332 22 03 22 45",
  "position": "Frontend Developer",
  "experience": 1,
  "education": "Bachelor - React Application Developer",
  "presentation": "Motivated frontend developer with a passion for clean code and scalable UIs.",
  "soft_skills": ["autonomy", "teamwork", "adaptability"],
  "technical_skills": ["React", "Next.js", "TypeScript", "Jest"],
}
  
    Resume:
    ${resume}
`;
};
