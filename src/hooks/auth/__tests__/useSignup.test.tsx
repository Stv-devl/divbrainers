/**
 * @jest-environment jsdom
 */
import { renderHook, act } from '@testing-library/react';
import { signIn } from 'next-auth/react';
import useSignUp from '../../../hooks/auth/useSignup';
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

describe('useSignUp hook', () => {
  const mockPostSignup = postSignup as jest.Mock;
  const mockSignIn = signIn as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with correct values', () => {
    const { result } = renderHook(() => useSignUp());

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

    const { result } = renderHook(() => useSignUp());

    await act(async () => {
      await result.current.onSubmit({
        email: 'test@test.com',
        password: 'goodpassword',
        repeat: 'goodpassword',
      });
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

  it('should not redirect if signIn fails', async () => {
    mockPostSignup.mockResolvedValueOnce({});
    mockSignIn.mockResolvedValueOnce({ ok: false });

    const { result } = renderHook(() => useSignUp());

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

  it('should set globalError if postSignup throws', async () => {
    mockPostSignup.mockRejectedValueOnce(new Error('Email already in use'));

    const { result } = renderHook(() => useSignUp());

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

  it('should call signIn with Google provider', async () => {
    const { result } = renderHook(() => useSignUp());

    await act(async () => {
      await result.current.handleGoogleSignIn();
    });

    expect(mockSignIn).toHaveBeenCalledWith('google', {
      callbackUrl: '/home',
    });
  });
});
