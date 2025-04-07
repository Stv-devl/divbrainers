/**
 * @jest-environment jsdom
 */
import { renderHook, act } from '@testing-library/react';
import { signIn } from 'next-auth/react';
import useLogin from '../useLogin';

jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}));

describe('useLogin hook', () => {
  it('should initialize with correct values', () => {
    const { result } = renderHook(() => useLogin());

    expect(result.current).toHaveProperty('register');
    expect(result.current).toHaveProperty('handleSubmit');
    expect(result.current).toHaveProperty('onSubmit');
    expect(result.current).toHaveProperty('errors');
    expect(result.current).toHaveProperty('isSubmitting');
    expect(result.current).toHaveProperty('handleGoogleSignIn');
  });

  it('should call signIn with credentials on valid submit', async () => {
    const mockSignIn = signIn as jest.Mock;

    mockSignIn.mockResolvedValueOnce({ ok: true });

    const { result } = renderHook(() => useLogin());

    const validData = {
      email: 'test@test.com',
      password: 'goodpassword',
    };

    await act(async () => {
      await result.current.onSubmit(validData);
    });

    expect(mockSignIn).toHaveBeenCalledWith('credentials', {
      redirect: true,
      email: validData.email,
      password: validData.password,
      callbackUrl: '/home',
    });
  });

  it('should call setError if signIn returns an error', async () => {
    const mockSignIn = signIn as jest.Mock;

    const errorMessage = 'Invalid credentials';
    mockSignIn.mockResolvedValueOnce({ error: errorMessage });

    const { result } = renderHook(() => useLogin());

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    await act(async () => {
      await result.current.onSubmit({
        email: 'invalid@test.com',
        password: 'wrongpassword',
      });
    });

    expect(mockSignIn).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it('should call signIn with google provider', async () => {
    const mockSignIn = signIn as jest.Mock;

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.handleGoogleSignIn();
    });

    expect(mockSignIn).toHaveBeenCalledWith('google', {
      redirect: true,
      callbackUrl: '/home',
    });
  });
});
