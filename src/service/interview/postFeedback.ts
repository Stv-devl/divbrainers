import { getCsrfToken } from 'next-auth/react';

export interface FeedbackMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface CreateFeedbackResponse {
  success: boolean;
  feedbackId?: string;
}

/**
 * postFeedback function
 * @param {string} interviewId - The interview ID
 * @param {string} userId - The user ID
 * @param {FeedbackMessage[]} transcript - The transcript messages
 * @returns {Promise<CreateFeedbackResponse>} The response from the API
 */
const postFeedback = async (
  interviewId: string,
  transcript: FeedbackMessage[]
): Promise<CreateFeedbackResponse> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/feedback`;

  try {
    const csrfToken = await getCsrfToken();
    if (!csrfToken) throw new Error('Missing CSRF token');

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
      },
      body: JSON.stringify({ interviewId, transcript }),
      credentials: 'include',
    };

    const response = await fetch(url, options as RequestInit);

    if (!response.ok) {
      throw new Error(`Error creating feedback. Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Feedback created successfully');
    return data;
  } catch (error: unknown) {
    console.error('Error creating feedback:', error);
    throw error;
  }
};

export default postFeedback;
