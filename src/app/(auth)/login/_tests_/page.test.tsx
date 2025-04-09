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

const renderLogin = () =>
  act(async () => {
    render(<Login />);
  });

describe('Login Page', () => {
  let mockedProps: UseLoginReturn;

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

  it('displays field and global errors', async () => {
    mockedUseLogin.mockReturnValue(
      getMockedUseLoginProps({
        errors: {
          email: { message: 'Invalid email address', type: 'required' },
          password: { message: 'At least 8 characters', type: 'required' },
        },
        globalError: 'Email or password incorrect',
      })
    );

    await renderLogin();

    expect(screen.getByText('Invalid email address')).toBeInTheDocument();
    expect(screen.getByText('At least 8 characters')).toBeInTheDocument();
    expect(screen.getByText('Email or password incorrect')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Login />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
