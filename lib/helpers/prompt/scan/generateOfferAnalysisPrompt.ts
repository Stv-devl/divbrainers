export const generateOfferAnalysisPrompt = (validOffer: string) => {
  return `
  You are an expert in job offer analysis. Your task is to extract the following structured information from the job description below and return it as a JSON object:
  
   1. positions: a generic, standardized job title (e.g., "Fullstack Developer", "Backend Developer"...)
   2. years_experience: an integer representing the number of required years of experience (e.g., 2, 5)
   3. education_level: the minimum required education level (e.g., "Bachelor’s degree", "Master’s degree", "PhD")
   4. work_location: the location of the job (e.g., "Paris, France") or specific indication about telecommuting
   5. remote_status: either "on-site", "remote", or "hybrid"
  
  Guidelines:
  - The response must be in the same language as the job offer.
  - For the positions field, extract the job title as written in the job description if it is explicitly mentioned.
    If the title is not clearly stated 
    In all cases, avoid overly specific, rare, or non-standard titles. Prefer concise and commonly used roles (e.g., "Backend Developer", "Fullstack Developer").
  - If a field is not found or cannot be determined reliably, return null.
  - If language is french is common to write Bac+2 : Bts, Bac+3 : licence , B+4 : master, B+5 : ingenieur...
  - Always return a valid JSON object — no explanations, no code blocks, no markdown formatting.
  
Expected output example:
{
  "positions": "Fullstack Developer",
  "years_experience": 3,
  "education_level": "Ingenieur",
  "work_location": "Paris, France",
  "remote_status": "on-site",
  }

  Job description:
  ${validOffer}
  `;
};
