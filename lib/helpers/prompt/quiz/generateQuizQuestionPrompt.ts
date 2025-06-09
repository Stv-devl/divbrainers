/**
 * Generates a prompt to create a technical quiz question
 * @param difficulty - The difficulty level of the question (e.g., junior, mid, senior)
 * @param stack - The technology stack (e.g., React, Node, etc.)
 * @returns A prompt string for the AI
 */
export const generateQuizQuestionPrompt = (
  difficulty: string,
  stack: string[]
) => {
  const randomNote = Math.random().toString(36).slice(2, 7);

  return `
  You are a senior software engineer and recruiter.
  Generate 1 original and creative multiple-choice question for a developer quiz.
  
  - Difficulty: ${difficulty}
  - Tech Stack: ${stack}
  - Random ID: ${randomNote}
  - Vary the topic across generations to avoid repeating the same concepts
  - Language: English

  Avoid:
  - Repeating common beginner questions (like useEffect, useState, "what is React?")
  - Copying previous wording or known templates
  - Generic questions

  Requirements:
  - The question must be directly related to at least one of the technologies
  - Cover a mix of topics: syntax, performance, architecture, testing, debugging, scalability, recent features, etc.
  - It must be practical and relevant to real-world use cases
  
  Instructions:
  - Return a single question object with 4 answers.
  - The object must be in this **exact JSON format**:
  {
    "question": "string",
    "answers": ["string", "string", "string", "string"],
    "correctAnswer": "string"
  }
  
  Rules:
  - The question must be clear, short, and relevant to the stack.
  - The answers must be unique and plausible.
  - The correct answer must match exactly one of the provided answers.
  - Do not include any explanations or code blocks.
  - Output **only** the JSON object. No markdown, no text before or after.
    `;
};
