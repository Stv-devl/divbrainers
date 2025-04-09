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
  let mockedProps: ReturnType<typeof getMockedUseSignUpProps>;

  const getMockedUseSignUpProps = (overrides = {}) => ({
    register: jest.fn().mockReturnValue(mockRegisterReturn),
    handleSubmit: mockHandleSubmit,
    onSubmit: mockOnSubmit,
    handleGoogleSignIn: mockHandleGoogleSignIn,
    errors: {},
    globalError: '',
    isSubmitting: false,
    ...overrides,
  });

  beforeEach(() => {
    mockedProps = getMockedUseSignUpProps();
    (useSignUp as jest.Mock).mockReturnValue(mockedProps);
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
    fireEvent.submit(container.querySelector('form')!);
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it('should call Google sign-in handler when clicking button', () => {
    render(<SignUp />);
    fireEvent.click(
      screen.getByRole('button', { name: /Signup with Google/i })
    );
    expect(mockHandleGoogleSignIn).toHaveBeenCalled();
  });

  it('should disable buttons when isSubmitting is true', () => {
    mockedProps.isSubmitting = true;
    render(<SignUp />);
    expect(
      screen.getByRole('button', { name: /Create a new account/i })
    ).toBeDisabled();
    expect(
      screen.getByRole('button', { name: /Signup with Google/i })
    ).toBeDisabled();
  });

  it('should display multiple error messages if validation fails', () => {
    mockedProps.errors = {
      email: { message: 'Email is required' },
      password: { message: 'At least 8 characters' },
      repeat: { message: 'Passwords do not match' },
    };

    render(<SignUp />);
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('At least 8 characters')).toBeInTheDocument();
    expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
  });

  it('should display global error message if signup fails', () => {
    mockedProps.globalError = 'Signup failed';
    render(<SignUp />);
    const error = screen.getByText('Signup failed');
    expect(error).toBeInTheDocument();
    expect(error).toHaveClass('text-red-500');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<SignUp />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
