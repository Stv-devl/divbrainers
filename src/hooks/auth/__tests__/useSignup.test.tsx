/**
 * @jest-environment jsdom
 */
import { renderHook, act } from '@testing-library/react';
import { signIn } from 'next-auth/react';
import useSignup from '../../../hooks/auth/useSignup';
import postSignup from '../../../service/auth/postSignup';

jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}));

jest.mock('../../../service/auth/postSignup', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
) as jest.Mock;

describe('useSignUp hook', () => {
  const mockPostSignup = postSignup as jest.Mock;
  const mockSignIn = signIn as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should expose expected properties', () => {
    const { result } = renderHook(() => useSignup());

    expect(result.current).toHaveProperty('register');
    expect(result.current).toHaveProperty('handleSubmit');
    expect(result.current).toHaveProperty('onSubmit');
    expect(result.current).toHaveProperty('errors');
    expect(result.current).toHaveProperty('isSubmitting');
    expect(result.current).toHaveProperty('handleGoogleSignIn');
  });

  it('should call postSignup and signIn, then redirect on success', async () => {
    mockPostSignup.mockResolvedValueOnce({});
    mockSignIn.mockResolvedValueOnce({ ok: true });

    const { result } = renderHook(() => useSignup());

    const validData = {
      email: 'test@test.com',
      password: 'goodpassword',
      repeat: 'goodpassword',
    };

    await act(async () => {
      await result.current.onSubmit(validData);
    });

    expect(mockPostSignup).toHaveBeenCalledWith(
      'test@test.com',
      'goodpassword'
    );
    expect(mockSignIn).toHaveBeenCalledWith('credentials', {
      redirect: false,
      email: 'test@test.com',
      password: 'goodpassword',
    });
    expect(mockPush).toHaveBeenCalledWith('/home');
  });

  it('should set an error if signIn fails', async () => {
    mockPostSignup.mockResolvedValueOnce({});
    mockSignIn.mockResolvedValueOnce({ ok: false });

    const { result } = renderHook(() => useSignup());

    await act(async () => {
      await result.current.onSubmit({
        email: 'fail@test.com',
        password: 'wrongpass',
        repeat: 'wrongpass',
      });
    });

    expect(mockSignIn).toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('should handle error thrown by postSignup', async () => {
    mockPostSignup.mockRejectedValueOnce(new Error('Signup failed'));

    const { result } = renderHook(() => useSignup());

    await act(async () => {
      await result.current.onSubmit({
        email: 'invalid@test.com',
        password: 'wrongpassword',
        repeat: 'wrongpassword',
      });
    });

    expect(mockPostSignup).toHaveBeenCalled();
    expect(mockSignIn).not.toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('should call signIn with Google when handleGoogleSignIn is called', async () => {
    const { result } = renderHook(() => useSignup());

    await act(async () => {
      await result.current.handleGoogleSignIn();
    });

    expect(mockSignIn).toHaveBeenCalledWith('google', { callbackUrl: '/home' });
  });
});
