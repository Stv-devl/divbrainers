/**
 * @jest-environment jsdom
 */

import { renderHook, act } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { postSendEmail } from '@/service/auth/postSendEmail';
import useSendLink from '../useSendLink';

jest.mock('@/service/auth/postSendEmail');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('useSendLink hook', () => {
  const push = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push });
    jest.clearAllMocks();
  });

  it('should initialize with correct values', () => {
    const { result } = renderHook(() => useSendLink());

    expect(result.current).toHaveProperty('register');
    expect(result.current).toHaveProperty('handleSubmit');
    expect(result.current).toHaveProperty('onSubmit');
    expect(result.current).toHaveProperty('errors');
    expect(result.current).toHaveProperty('isSubmitting');
  });

  it('should call sendEmailHandler with correct values and redirect on success', async () => {
    (postSendEmail as jest.Mock).mockResolvedValue({ success: true });

    const { result } = renderHook(() => useSendLink());

    await act(async () => {
      await result.current.onSubmit({ email: 'test@example.com' });
    });

    expect(postSendEmail).toHaveBeenCalledWith('test@example.com');
    expect(push).toHaveBeenCalledWith('/login');
  });

  it('should set error if postSendEmail returns error', async () => {
    (postSendEmail as jest.Mock).mockResolvedValue({ error: 'Invalid email' });

    const { result } = renderHook(() => useSendLink());

    await act(async () => {
      await result.current.onSubmit({ email: 'invalid@example.com' });
    });

    expect(result.current.errors.email?.message).toBe('Invalid email');
    expect(push).not.toHaveBeenCalled();
  });

  it('should set error if postSendEmail throws', async () => {
    (postSendEmail as jest.Mock).mockRejectedValue(new Error('Server error'));

    const { result } = renderHook(() => useSendLink());

    await act(async () => {
      await result.current.onSubmit({ email: 'test@example.com' });
    });

    expect(result.current.errors.email?.message).toBe('Failed to send email');
    expect(push).not.toHaveBeenCalled();
  });
});
