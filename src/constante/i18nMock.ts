/**
 * Mock for i18n translations used in tests
 * Maps translation keys to their English translations
 */
const translations: Record<string, string> = {
  'login.title': 'Login',
  'login.subtitle': 'Add your details below to get back into the app',
  'login.form.email.label': 'Email address',
  'login.form.email.placeholder': 'Write your email',
  'login.form.password.label': 'Password',
  'login.form.password.placeholder': 'Enter your password',
  'login.form.forgot': 'Forget your password?',
  'login.form.forgotPassword': 'Forget your password?',
  'login.form.submit': 'Login',
  'login.form.google': 'Login with Google',
  'login.form.createAccount': 'Create account',
  'login.form.errors.email.invalid': 'Invalid email address',
  'login.form.errors.password.min': 'At least 8 characters',
  'login.footerLogin.noAccount': "Don't have an account?",
  'login.footerLogin.create': 'Create account',

  // Signup translations
  'signup.title': 'Create account',
  'signup.subtitle': "Let's get you started sharing your links!",
  'signup.form.email.label': 'Email address',
  'signup.form.email.placeholder': 'Write your email',
  'signup.form.password.label': 'Password',
  'signup.form.password.placeholder': 'At least 8 characters',
  'signup.form.repeat.label': 'Confirm password',
  'signup.form.repeat.placeholder': 'At least 8 characters',
  'signup.form.submit': 'Create a new account',
  'signup.form.google': 'Signup with Google',
  'signup.form.errors.email.required': 'Email is required',
  'signup.form.errors.email.invalid': 'Invalid email address',
  'signup.form.errors.password.required': 'Password is required',
  'signup.form.errors.password.min': 'At least 8 characters',
  'signup.form.errors.repeat.required': 'Please confirm your password',
  'signup.form.errors.repeat.mismatch': 'Passwords do not match',
  'signup.footerSignup.already': 'Already have an account?',
  'signup.footerSignup.login': 'Login',

  // New password translations (resetPassword)
  'newPassword.title': 'New password',
  'newPassword.subtitle': 'Write your new password',
  'newPassword.form.password.label': 'Password',
  'newPassword.form.password.placeholder': 'Enter your password',
  'newPassword.form.repeat.label': 'Repeat password',
  'newPassword.form.repeat.placeholder': 'Repeat your password',
  'newPassword.form.submit': 'Change password',
  'newPassword.form.errors.password.required': 'Password is required',
  'newPassword.form.errors.password.min': 'At least 4 characters',
  'newPassword.form.errors.repeat.required': 'Please confirm your password',
  'newPassword.form.errors.repeat.mismatch': 'Passwords must match',
  'newPassword.form.errors.token': 'Invalid or missing token/email in URL',
  'newPassword.form.errors.failed': 'Failed to reset password',
  'newPassword.form.errors.invalid': 'Invalid data',
  'newPassword.form.errors.generic': 'An error occurred',

  // Reset password translations (these are used by the actual component)
  'resetPassword.title': 'New password',
  'resetPassword.subtitle': 'Write your new password',
  'resetPassword.form.password.label': 'Password',
  'resetPassword.form.password.placeholder': 'Enter your password',
  'resetPassword.form.repeat.label': 'Repeat password',
  'resetPassword.form.repeat.placeholder': 'Repeat your password',
  'resetPassword.form.submit': 'Change password',

  // Send link translations
  'sendLink.title': 'Recover password',
  'sendLink.subtitle': 'Enter your email to recover your password',
  'sendLink.form.email.label': 'Email address',
  'sendLink.form.email.placeholder': 'Write your email',
  'sendLink.form.submit': 'Get a link to reset password',
  'sendLink.form.errors.email.required': 'Email is required',
  'sendLink.form.errors.email.invalid': 'Invalid email address',
  'sendLink.form.errors.email.sendError': 'Failed to send email',

  // Global error messages that might be used in tests
  'Email or password incorrect': 'Email or password incorrect',
  'Signup failed': 'Signup failed',
  'Invalid email address': 'Invalid email address',
  'At least 8 characters': 'At least 8 characters',
  'Email is required': 'Email is required',
  'Passwords do not match': 'Passwords do not match',
  'Password is required': 'Password is required',
  'Passwords must match': 'Passwords must match',
  'Invalid email': 'Invalid email',
};

const mockTranslation = (key: string): string => {
  return translations[key] || key;
};

jest.mock('@/hooks/i18n/useClientTranslation', () => ({
  useClientTranslation: () => ({
    t: mockTranslation,
    isClient: true,
  }),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: mockTranslation,
    i18n: {
      changeLanguage: jest.fn(),
    },
  }),
}));
