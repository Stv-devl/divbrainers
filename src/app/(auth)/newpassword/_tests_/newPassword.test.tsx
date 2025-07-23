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
import useResetPassword from '@/hooks/auth/useResetPassword';
import NewPassword from '../page';

expect.extend(toHaveNoViolations);

jest.mock('@/hooks/auth/useResetPassword', () => ({
  __esModule: true,
  default: jest.fn(),
}));

type UseResetPasswordReturn = ReturnType<typeof useResetPassword>;
const mockedUseResetPassword = useResetPassword as jest.MockedFunction<
  typeof useResetPassword
>;

const getMockedHookProps = (overrides = {}): UseResetPasswordReturn => ({
  register: jest.fn().mockReturnValue({
    onChange: jest.fn(),
    onBlur: jest.fn(),
    ref: jest.fn(),
    name: 'mockField',
  }),
  handleSubmit: (cb: any) => (e: any) => cb(e),
  onSubmit: jest.fn(),
  errors: {},
  isSubmitting: false,
  ...overrides,
});

const renderNewPassword = () =>
  act(async () => {
    render(<NewPassword />);
  });

describe('NewPassword Page', () => {
  let mockedProps: UseResetPasswordReturn;

  beforeEach(() => {
    mockedProps = getMockedHookProps();
    mockedUseResetPassword.mockReturnValue(mockedProps);
  });

  it('renders password and repeat fields and submit button', async () => {
    await renderNewPassword();

    expect(
      screen.getByPlaceholderText('Enter your password')
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText('Repeat your password')
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: 'Change password' })
    ).toBeInTheDocument();
  });

  it('submits the form correctly', async () => {
    await renderNewPassword();

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      expect(mockedProps.onSubmit).toHaveBeenCalled();
    });
  });

  it('disables submit button while submitting', async () => {
    mockedUseResetPassword.mockReturnValue(
      getMockedHookProps({ isSubmitting: true })
    );

    await renderNewPassword();

    const button = screen.getByRole('button', { name: '' });
    expect(button).toBeDisabled();
  });

  it('displays field error messages', async () => {
    mockedUseResetPassword.mockReturnValue(
      getMockedHookProps({
        errors: {
          password: { message: 'Password is required', type: 'required' },
          repeat: { message: 'Passwords must match', type: 'validate' },
        },
      })
    );

    await renderNewPassword();

    expect(screen.getByText('Password is required')).toBeInTheDocument();
    expect(screen.getByText('Passwords must match')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<NewPassword />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
