export const postResetPassword = async (resetPasswordPayload: {
  email: string;
  token: string;
  password: string;
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resetPasswordPayload),
      }
    );

    if (!response.ok) {
      const errorDetails = await response.text();
      console.error(
        'Reset password failed with status',
        response.status,
        errorDetails
      );
      throw new Error(`Reset password failed: ${errorDetails}`);
    }
    const data = await response.json();
    console.log('Reset password successful', data);

    return data;
  } catch (error) {
    console.error('Error during reset password:', error);
    throw error;
  }
};
