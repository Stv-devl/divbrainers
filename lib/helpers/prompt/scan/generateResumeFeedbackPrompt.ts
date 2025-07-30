export const generateResumeFeedbackPrompt = (
  resume: string,
  offer: string,
  validKeywords: string[],
  lang: 'fr' | 'en' = 'en'
) => {
  const isFr = lang === 'fr';

  const languageInstruction = isFr
    ? 'IMPORTANT : La réponse doit être entièrement rédigée en français.'
    : 'IMPORTANT: The response must be fully written in English.';

  const labels = {
    relevance: isFr ? "Pertinence de l'expérience" : 'Relevance of experience',
    technical: isFr
      ? 'Correspondance des compétences techniques'
      : 'Technical skills match',
    soft: isFr
      ? 'Compétences relationnelles et adéquation de personnalité'
      : 'Soft skills and personality fit',
    education: isFr ? 'Éducation' : 'Education',
    total: isFr ? 'Score total' : 'Total score',
    resume: isFr ? 'Évaluation du CV' : 'Resume assessment',
    summary: isFr
      ? 'Évaluation finale et score total'
      : 'Final assessment and total score',
  };

  return `
      You are an expert assistant specialized in CV evaluation.
       TASK: Return a **valid JSON array with 7 objects** based on the analysis below.  
    
    IMPORTANT 
    – Language Rule:${languageInstruction}

      
      Each object must have:
      - "key" (e.g., "relevance")
      - "label" (human-readable title)
      - One or more of:
        - "score": number (0–20)
        - "comment": short explanation
        - "items": array of bullets
        - "text": one short paragraph
      
      Evaluate the candidate :
      
      1. Relevance of experience ("relevance")
        - key: "relevance"
        - label: "${labels.relevance}"
        - What to evaluate: 
          - Evaluate how well the candidate’s previous roles match the type of job (e.g., frontend, backend).
          - Compare the required years of experience from the job offer with the **relevant** experience from the resume.
          - If the candidate has **1–2 years less** than required but shows relevant projects or strong alignment, **do NOT apply a harsh penalty**. A score between 11–13/20 is acceptable in this case.
          - Only give scores below 10 if the experience is unrelated or minimal.
        - Output: \`score\` + \`comment\`
      
       02. **Technical skills match**
        - key: "technical_skills"
        - label: "${labels.technical}"
        - What to evaluate:
             - Compare the candidate’s technical stack with the required tools, frameworks, and languages in the job offer.
             - Do **NOT penalize the absence of JavaScript, HTML, CSS, or W3C, etc** if the candidate already lists frontend frameworks like React, Next.js, or Vue — these skills are **implicit and expected**.
             - Only mention tools that are truly missing and essential, like specific backend tech (e.g., Laravel) or cloud tools (e.g., AWS, S3).
             - Do not overvalue the presence or absence of minor or outdated tools unless they are clearly critical to the job offer.
        - Output: \`score\` + \`comment\`
      
        03. **Soft skills and personality fit**
        - key: "soft_skills"
        - label: "${labels.soft}"
        - What to evaluate: Soft skills alignment (e.g., communication, adaptability).
        - Output: \`score\` + \`comment\`
      
        04. **Education**
        - key: "education"
        - label: "${labels.education}"
        - What to evaluate: Assess the relevance of the candidate’s degrees, certifications, or training to the role.
          If the candidate holds a degree higher than the one required in the job offer, it should be considered a positive factor, as long as it remains relevant to the field.
        - Output: \`score\` + \`comment\`
    
        05. **Total score**
         - key: "total"
         - label: "${labels.total}"
         - What to evaluate: Calculate the weighted average of the five criteria above (each scored from 0 to 20). The weights for each field are as follows:
               - Relevance of experience: 3
               - Technical skills match: 3
               - Soft skills and personality fit: 1
               - Education: 1
               - Resume Assessment: 1
               Note: The final result must be an integer only, without any decimals or rounding, simply use the integer part of the result.
         - Output: \`score\` only
    

        06. **Resume Assessment**
        - key: "resume_check"
        - label: "${labels.resume}"
        - What to evaluate: 
          Carefully analyze the candidate's resume and evaluate it across the following **10 distinct key aspects**:
                 - Address: Is the location clear, at least the city?
                 - Phone number: Is it present?
                 - Email : Is it present and at good format ?
                 - Position: Is the target job title clearly stated?
                 - Experience: Does the CV clearly state the number of years of relevant professional experience?
                 - Education: Is the most relevant and highest diploma or degree mentioned?
                 - Presentation: Is there a short personal summary/introduction? If yes, provide a brief review of its quality (clarity, relevance, tone). If no give an exemple of presentation in 4-5 lignes.
                 - Soft skills: Are soft skills explicitly listed or easily inferred?
                 - Technical skills: Are technical skills listed clearly (e.g., React, Git, etc.)?
                 - Overall Assessment: always provide a brief global assessment of the resume’s quality (1–2 sentences), along with 1 or 2 concise suggestions to make it even more effective (e.g., structure, formatting, tone).
                 Instructions:
                 - Do not write or repeat any user information (such as email, phone, city, etc.).
        - Output: \`score\` \`items\` (array)
    
        7. **Final assessment**
         - key: "summary"
         -  label: "${labels.summary}"
         - What to evaluate: A short paragraph (4-6 ligne) summarizing how well the candidate fits the job offer overall.
         - Penalize clearly if:
         - Mismatch between job type (e.g., frontend CV vs backend job)
         - Penalize only when clearly important technologies required by the job offer are absent or not demonstrated. Do not penalize for obvious baseline skills (e.g., a developer is assumed to know HTML unless proven otherwise).
         - Incompatible work location or conditions
         - Output: \`text\` (string)
      
        Guidelines:
         - Return a strictly valid JSON array with 7 objects.
         - Do not include markdown, explanations, or code blocks.
    
      
        Candidate resume:
        ${resume}
        
        Job offer analysis:
        ${offer}
        
        Required Technical Skills and Soft Skills:
        ${validKeywords.join(', ')}
        `;
};
