import nodemailer from 'nodemailer';

/**
 * Send a reset password email to the user
 * @param {string} email - The email of the user
 * @param {string} resetUrl - The URL to reset the password
 * @returns {Promise<nodemailer.SentMessageInfo>} The sent message info
 */
export async function sendResetEmail(email: string, resetUrl: string) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: '"Support DivBrainers" <divbrainers@gmail.com>',
    to: email,
    subject: 'Password Reset',
    html: `
      <p>You have requested a password reset.</p>
      <p><a href="${resetUrl}">Click here to reset your password</a></p>
      <p>This link expires in 30 minutes.</p>
      <p>Welcome back to DivBrainers</p>
    `,
  };

  return transporter
    .sendMail(mailOptions)
    .then((info) => {
      console.log('Email sent:', info);
      return info;
    })
    .catch((error) => {
      console.error('Email send error:', error);
      throw error;
    });
}
