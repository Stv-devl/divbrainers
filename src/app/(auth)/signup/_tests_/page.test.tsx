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
import useSignUp from '../../../../hooks/auth/useSignup';
import SignUp from '../page';

expect.extend(toHaveNoViolations);

jest.mock('../../../../hooks/auth/useSignup', () => ({
  __esModule: true,
  default: jest.fn(),
}));

type UseSignUpReturn = ReturnType<typeof useSignUp>;
const mockedUseSignUp = useSignUp as jest.MockedFunction<typeof useSignUp>;

const getMockedUseSignUpProps = (overrides = {}): UseSignUpReturn => ({
  register: jest.fn().mockReturnValue({
    onChange: jest.fn(),
    onBlur: jest.fn(),
    ref: jest.fn(),
    name: 'mockField',
  }),
  handleSubmit: (cb: any) => (e: any) => cb(e),
  onSubmit: jest.fn(),
  handleGoogleSignIn: jest.fn(),
  errors: {},
  isSubmitting: false,
  ...overrides,
});

const renderSignUp = () =>
  act(async () => {
    render(<SignUp />);
  });

describe('SignUp Page', () => {
  let mockedProps: UseSignUpReturn;

  beforeEach(() => {
    mockedProps = getMockedUseSignUpProps();
    mockedUseSignUp.mockReturnValue(mockedProps);
  });

  it('renders all sign-up elements correctly', async () => {
    await renderSignUp();
    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm password')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Create a new account/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Signup with Google/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Already have an account\?/i)).toBeInTheDocument();
  });

  it('submits the form correctly', async () => {
    await renderSignUp();

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      expect(mockedProps.onSubmit).toHaveBeenCalled();
    });
  });

  it('handles Google sign-in when button is clicked', async () => {
    await renderSignUp();

    fireEvent.click(
      screen.getByRole('button', { name: /Signup with Google/i })
    );

    expect(mockedProps.handleGoogleSignIn).toHaveBeenCalled();
  });

  it('disables buttons while submitting', async () => {
    mockedUseSignUp.mockReturnValue(
      getMockedUseSignUpProps({ isSubmitting: true })
    );

    await renderSignUp();

    expect(
      screen.getByRole('button', { name: /Create a new account/i })
    ).toBeDisabled();
    expect(
      screen.getByRole('button', { name: /Signup with Google/i })
    ).toBeDisabled();
  });

  it('displays field errors correctly', async () => {
    mockedUseSignUp.mockReturnValue(
      getMockedUseSignUpProps({
        errors: {
          email: { message: 'Email is required' },
          password: { message: 'At least 8 characters' },
          repeat: { message: 'Passwords do not match' },
        },
      })
    );

    await renderSignUp();

    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('At least 8 characters')).toBeInTheDocument();
    expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<SignUp />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
