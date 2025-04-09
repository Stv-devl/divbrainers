/**
 * @jest-environment jsdom
 */
import { renderHook, act } from '@testing-library/react';
import useResetPassword from '@/hooks/auth/useResetPassword';
import { postResetPassword } from '@/service/auth/postResetPassword';

jest.mock('@/service/auth/postResetPassword', () => ({
  postResetPassword: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

describe('useResetPassword hook', () => {
  const mockPostResetPassword = postResetPassword as jest.Mock;
  const originalLocation = window.location;

  beforeEach(() => {
    jest.clearAllMocks();

    delete (window as any).location;
    (window as any).location = {
      search: '?token=test-token&email=test@test.com',
    };
  });

  afterAll(() => {
    window.location = originalLocation;
  });

  it('should initialize with correct values', () => {
    const { result } = renderHook(() => useResetPassword());

    expect(result.current).toHaveProperty('register');
    expect(result.current).toHaveProperty('handleSubmit');
    expect(result.current).toHaveProperty('onSubmit');
    expect(result.current).toHaveProperty('errors');
    expect(result.current).toHaveProperty('isSubmitting');
  });

  it('should call postResetPassword with correct data on valid submit', async () => {
    mockPostResetPassword.mockResolvedValueOnce({ ok: true });

    const { result } = renderHook(() => useResetPassword());

    await act(async () => {
      await result.current.onSubmit({
        password: 'goodpassword',
        repeat: 'goodpassword',
      });
    });

    expect(mockPostResetPassword).toHaveBeenCalledWith({
      email: 'test@test.com',
      token: 'test-token',
      password: 'goodpassword',
    });
  });

  it('should set error if token or email is missing in URL', async () => {
    (window as any).location.search = '';

    const { result } = renderHook(() => useResetPassword());

    await act(async () => {
      await result.current.onSubmit({
        password: 'anyPassword',
        repeat: 'anyPassword',
      });
    });

    expect(result.current.errors.password?.message).toBe(
      'Invalid or missing token/email in URL'
    );
    expect(mockPostResetPassword).not.toHaveBeenCalled();
  });

  it('should set error if postResetPassword returns error', async () => {
    mockPostResetPassword.mockResolvedValueOnce({
      ok: false,
      error: 'Reset failed',
    });

    const { result } = renderHook(() => useResetPassword());

    await act(async () => {
      await result.current.onSubmit({
        password: 'anyPassword',
        repeat: 'anyPassword',
      });
    });

    expect(result.current.errors.password?.message).toBe('Reset failed');
  });

  it('should set error if postResetPassword throws', async () => {
    mockPostResetPassword.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useResetPassword());

    await act(async () => {
      await result.current.onSubmit({
        password: 'anyPassword',
        repeat: 'anyPassword',
      });
    });

    expect(result.current.errors.password?.message).toBe(
      'Failed to reset password'
    );
  });
});
