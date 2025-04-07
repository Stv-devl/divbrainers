/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import SignUp from '../page';
import useSignUp from '../../../../hooks/auth/useSignup';

expect.extend(toHaveNoViolations);

jest.mock('../../../../hooks/auth/useSignup', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockOnSubmit = jest.fn();
const mockHandleGoogleSignIn = jest.fn();
const mockHandleSubmit = (cb: any) => (e: any) => cb(e);

const mockRegisterReturn = {
  onChange: jest.fn(),
  onBlur: jest.fn(),
  ref: jest.fn(),
  name: 'mockField',
};

describe('SignUp Page', () => {
  beforeEach(() => {
    (useSignUp as jest.Mock).mockReturnValue({
      register: jest.fn().mockReturnValue(mockRegisterReturn),
      handleSubmit: mockHandleSubmit,
      onSubmit: mockOnSubmit,
      handleGoogleSignIn: mockHandleGoogleSignIn,
      errors: {},
      isSubmitting: false,
    });
  });

  it('should render all fields and buttons', () => {
    render(<SignUp />);
    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm password')).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /Create a new account/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /Signup with Google/i })
    ).toBeInTheDocument();
  });

  it('should call onSubmit when form is submitted', () => {
    const { container } = render(<SignUp />);
    const form = container.querySelector('form');
    fireEvent.submit(form!);
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it('should call Google sign-in handler when clicking button', () => {
    render(<SignUp />);
    const googleButton = screen.getByRole('button', {
      name: /Signup with Google/i,
    });
    fireEvent.click(googleButton);
    expect(mockHandleGoogleSignIn).toHaveBeenCalled();
  });

  it('should disable buttons when isSubmitting is true', () => {
    (useSignUp as jest.Mock).mockReturnValue({
      register: jest.fn().mockReturnValue(mockRegisterReturn),
      handleSubmit: mockHandleSubmit,
      onSubmit: mockOnSubmit,
      handleGoogleSignIn: mockHandleGoogleSignIn,
      errors: {},
      isSubmitting: true,
    });

    render(<SignUp />);
    expect(
      screen.getByRole('button', { name: /Create a new account/i })
    ).toBeDisabled();
    expect(
      screen.getByRole('button', { name: /Signup with Google/i })
    ).toBeDisabled();
  });

  it('should display multiple error messages if validation fails', () => {
    const emailError = 'Email is required';
    const passwordError = 'At least 8 characters';
    const repeatError = 'Passwords do not match';

    (useSignUp as jest.Mock).mockReturnValue({
      register: jest.fn().mockReturnValue(mockRegisterReturn),
      handleSubmit: mockHandleSubmit,
      onSubmit: mockOnSubmit,
      handleGoogleSignIn: mockHandleGoogleSignIn,
      errors: {
        email: { message: emailError },
        password: { message: passwordError },
        repeat: { message: repeatError },
      },
      isSubmitting: false,
    });

    render(<SignUp />);
    expect(screen.getByText(emailError)).toBeInTheDocument();
    expect(screen.getByText(passwordError)).toBeInTheDocument();
    expect(screen.getByText(repeatError)).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<SignUp />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
