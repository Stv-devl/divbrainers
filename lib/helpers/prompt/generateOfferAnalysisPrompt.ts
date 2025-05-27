export const generateOfferAnalysisPrompt = (
  validOffer: string,
  validKeywords: string[]
) => {
  return `
  You are an expert in job offer analysis. Your task is to extract the following structured information from the job description below and return it as a JSON object:
  
   1. positions: a generic, standardized job title (e.g., "Fullstack Developer", "Backend Developer", "Technical Project Manager")
   2. years_experience: an integer representing the number of required years of experience (e.g., 2, 5)
   3. education_level: the minimum required education level (e.g., "Bachelor’s degree", "Master’s degree", "PhD")
   4. contract_type: the type of contract (e.g., "CDI", "CDD", "Freelance", "Internship", "Alternance")
   5. work_location: the location of the job (e.g., "Paris, France") or specific indication about telecommuting
   6. remote_status: either "on-site", "remote", or "hybrid"
   7. remote_days: write the number of days of remote for one week if its specified
   8. working_hours: work schedule or typical work days (e.g., "Full-time", "Monday to Friday")
   9. salary_range: the gross monthly or annual salary range (e.g., "2000€ - 4000€/month" or "30000€/year"). 
      Pay close attention to number formats:
      - If the offer uses a format like "25.000,00€", interpret it as "25000€", not "2,500,000€".
      - Don't write anny decimal 
      - Always indicate whether the amount is monthly or yearly (e.g., "€/month" or "€/year").
   10. bonus: any extra benefits such as "13th month", "bonuses", "profit sharing", "employee stock ownership"
  
  Guidelines:
  - The response must be in the same language as the job offer.
  - For the positions field, extract the job title as written in the job description if it is explicitly mentioned.
    If the title is not clearly stated, infer a general job title based on the provided keywords:
    ${validKeywords.join(', ')}.
    In all cases, avoid overly specific, rare, or non-standard titles. Prefer concise and commonly used roles (e.g., "Backend Developer", "Fullstack Developer").
  - If a field is not found or cannot be determined reliably, return null.
  - If language is french is common to write ("Bac+2", "Bac+3", "Bac+4", "Bac+5")
  - Always return a valid JSON object — no explanations, no code blocks, no markdown formatting.
  
Expected output example:
{
  "positions": "Fullstack Developer",
  "years_experience": 3,
  "education_level": "Bac+5",
  "contract_type": "CDI",
  "work_location": "Paris, France",
  "remote_status": "on-site",
  "remote_days" : 2,
  "working_hours": "Monday to Friday",
  "salary_range": "2000€ - 4000€/month",
  "bonus": ["13th month", "profit sharing"],
}

  Job description:
  ${validOffer}
  `;
};
