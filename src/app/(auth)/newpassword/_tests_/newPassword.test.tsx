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
import NewPassword from '../page';
import useResetPassword from '@/hooks/auth/useResetPassword';

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

  it('renders all password fields and button', async () => {
    await renderNewPassword();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Repeat password')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Change password/i })
    ).toBeInTheDocument();
  });

  it('submits the form correctly', async () => {
    await renderNewPassword();
    fireEvent.submit(screen.getByRole('button', { name: /Change password/i }));

    await waitFor(() => {
      expect(mockedProps.onSubmit).toHaveBeenCalled();
    });
  });

  it('disables submit button while submitting', async () => {
    mockedUseResetPassword.mockReturnValue(
      getMockedHookProps({ isSubmitting: true })
    );

    await renderNewPassword();

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('displays field errors correctly', async () => {
    mockedUseResetPassword.mockReturnValue(
      getMockedHookProps({
        errors: {
          password: { message: 'Password is required' },
          repeat: { message: 'Passwords must match' },
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
