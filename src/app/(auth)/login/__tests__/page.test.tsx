/**
 * @jest-environment jsdom
 */

import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Login from '../page';
import useLogin from '../../../../hooks/auth/useLogin';

expect.extend(toHaveNoViolations);

jest.mock('../../../../hooks/auth/useLogin', () => ({
  __esModule: true,
  default: jest.fn(),
}));

type UseLoginReturn = ReturnType<typeof useLogin>;
const mockedUseLogin = useLogin as jest.MockedFunction<typeof useLogin>;

describe('Login Page', () => {
  let mockedProps: UseLoginReturn;

  const getMockedUseLoginProps = (overrides = {}) => ({
    register: jest.fn(),
    handleSubmit: jest.fn(),
    onSubmit: jest.fn(),
    errors: {},
    globalError: '',
    isSubmitting: false,
    handleGoogleSignIn: jest.fn(),
    ...overrides,
  });

  const renderLogin = async () => {
    await act(async () => {
      render(<Login />);
    });
  };

  beforeEach(() => {
    mockedProps = getMockedUseLoginProps();
    mockedUseLogin.mockReturnValue(mockedProps);
  });

  it('renders all login elements correctly', async () => {
    await renderLogin();
    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Login with Google' })
    ).toBeInTheDocument();
    expect(screen.getByText('Forget your password?')).toBeInTheDocument();
    expect(screen.getByText('Create account')).toBeInTheDocument();
  });

  it('handles form submission correctly', async () => {
    const mockHandleSubmit = jest.fn();
    mockedProps.handleSubmit = jest.fn(() => mockHandleSubmit);

    await renderLogin();

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      expect(mockHandleSubmit).toHaveBeenCalled();
    });
  });

  it('handles Google sign-in when button is clicked', async () => {
    await renderLogin();

    const googleButton = screen.getByRole('button', {
      name: 'Login with Google',
    });

    fireEvent.click(googleButton);

    expect(mockedProps.handleGoogleSignIn).toHaveBeenCalled();
  });

  it('disables buttons while submitting', async () => {
    mockedUseLogin.mockReturnValue(
      getMockedUseLoginProps({ isSubmitting: true })
    );

    await renderLogin();

    expect(screen.getByRole('button', { name: 'Login' })).toBeDisabled();
    expect(
      screen.getByRole('button', { name: 'Login with Google' })
    ).toBeDisabled();
  });

  it('displays email and password error messages and global error if validation fails', async () => {
    const emailErrorMessage = 'Invalid email address';
    const passwordErrorMessage = 'At least 8 characters';
    const globalError = 'Email or password incorrect';

    mockedUseLogin.mockReturnValue(
      getMockedUseLoginProps({
        errors: {
          email: { message: emailErrorMessage, type: 'required' },
          password: { message: passwordErrorMessage, type: 'required' },
        },
        globalError,
      })
    );

    await renderLogin();

    expect(screen.getByText(emailErrorMessage)).toBeInTheDocument();
    expect(screen.getByText(passwordErrorMessage)).toBeInTheDocument();
    expect(screen.getByText(globalError)).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = await (async () => {
      let rendered;
      await act(async () => {
        rendered = render(<Login />);
      });
      return rendered!;
    })();

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
