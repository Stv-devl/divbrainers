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
    expect(result.current).toHaveProperty('globalError');
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
      redirect: false,
      email: validData.email,
      password: validData.password,
      callbackUrl: '/home',
    });
  });

  it('should redirect to the correct URL on successful login', async () => {
    const mockSignIn = signIn as jest.Mock;

    mockSignIn.mockResolvedValueOnce({ ok: true, url: '/home' });

    delete (window as any).location;
    (window as any).location = { href: '' };

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.onSubmit({
        email: 'test@test.com',
        password: 'goodpassword',
      });
    });

    expect(window.location.href).toBe('/home');
  });

  it('should set globalError if signIn returns an error', async () => {
    const mockSignIn = signIn as jest.Mock;

    const errorMessage = 'Invalid credentials';
    mockSignIn.mockResolvedValueOnce({ error: errorMessage });

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.onSubmit({
        email: 'invalid@test.com',
        password: 'wrongpassword',
      });
    });

    expect(mockSignIn).toHaveBeenCalled();

    expect(result.current.globalError).toBe('Email or password incorrect');
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
