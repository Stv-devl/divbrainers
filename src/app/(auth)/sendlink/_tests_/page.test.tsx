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
import SendLink from '../page';
import useSendLink from '@/hooks/auth/useSendLink';
import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
} from 'react-hook-form';

expect.extend(toHaveNoViolations);

jest.mock('@/hooks/auth/useSendLink', () => ({
  __esModule: true,
  default: jest.fn(),
}));

type UseSendLinkReturn = ReturnType<typeof useSendLink>;
const mockedUseSendLink = useSendLink as jest.MockedFunction<
  typeof useSendLink
>;

const EMAIL = 'test@test.com';

const getMockedUseSendLinkProps = (overrides = {}): UseSendLinkReturn => ({
  register: jest.fn(),
  handleSubmit: ((fn: SubmitHandler<{ email: string }>) => {
    return async (e?: React.BaseSyntheticEvent) => {
      e?.preventDefault?.();
      await fn({ email: EMAIL });
    };
  }) as UseFormHandleSubmit<{ email: string }>,
  onSubmit: jest.fn(),
  errors: {} as FieldErrors<{ email: string }>,
  isSubmitting: false,
  ...overrides,
});

const renderSendLink = async () => {
  await act(async () => {
    render(<SendLink />);
  });
};

describe('SendLink Page', () => {
  let mockedProps: UseSendLinkReturn;

  beforeEach(() => {
    mockedProps = getMockedUseSendLinkProps();
    mockedUseSendLink.mockReturnValue(mockedProps);
  });

  it('renders all form elements correctly', async () => {
    await renderSendLink();

    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /get a link to reset password/i })
    ).toBeInTheDocument();
  });

  it('submits the form with the correct email', async () => {
    await renderSendLink();

    fireEvent.change(screen.getByPlaceholderText(/write your email/i), {
      target: { value: EMAIL },
    });

    fireEvent.click(
      screen.getByRole('button', {
        name: /get a link to reset password/i,
      })
    );

    await waitFor(() => {
      expect(mockedProps.onSubmit).toHaveBeenCalledWith({ email: EMAIL });
    });
  });

  it('disables submit button while submitting', async () => {
    mockedUseSendLink.mockReturnValue(
      getMockedUseSendLinkProps({ isSubmitting: true })
    );

    await renderSendLink();

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('displays email error message', async () => {
    mockedUseSendLink.mockReturnValue(
      getMockedUseSendLinkProps({
        errors: {
          email: { message: 'Invalid email', type: 'validate' },
        },
      })
    );

    await renderSendLink();

    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<SendLink />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
