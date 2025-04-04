export const postSendEmail = async (email: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/send-email`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      }
    );

    if (!response.ok) {
      const errorDetails = await response.text();
      console.error(
        'Send email failed with status',
        response.status,
        errorDetails
      );
      throw new Error(`Send email failed: ${errorDetails}`);
    }
    const data = await response.json();
    console.log('Send email successful', data);

    return data;
  } catch (error) {
    console.error('Error during send email:', error);
    throw error;
  }
};
