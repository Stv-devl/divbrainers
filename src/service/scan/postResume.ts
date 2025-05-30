import { getCsrfToken } from 'next-auth/react';
import { CreateResumeResponse } from '@/types/type';

const postResume = async (
  resumeFile: File,
  keywords: string[],
  analizeJobOffer: string
): Promise<CreateResumeResponse> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/resume-processing`;

  const csrfToken = await getCsrfToken();
  if (!csrfToken) {
    return {
      success: false,
      message: 'Missing CSRF token',
    };
  }

  const formData = new FormData();
  formData.append('resume', resumeFile);
  formData.append('keywords', JSON.stringify(keywords));
  formData.append('analizeJobOffer', analizeJobOffer);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'X-CSRF-Token': csrfToken,
      },
      body: formData,
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data?.message || 'Unknown error occurred.',
      };
    }

    return data;
  } catch (error) {
    console.error('Network or unexpected error:', error);
    return {
      success: false,
      message: 'A network or server error occurred.',
    };
  }
};

export default postResume;
