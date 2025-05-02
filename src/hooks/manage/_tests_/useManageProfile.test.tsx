/**
 * @jest-environment jsdom
 */
import { renderHook, act } from '@testing-library/react';
import { updateUserProfile } from '../../../../lib/actions/user/updateUserProfile';
import useManageProfile from '../useManageProfile';

jest.mock('../../../../lib/actions/user/updateUserProfile', () => ({
  updateUserProfile: jest.fn(),
}));

const mockUser = {
  name: 'John Doe',
  email: 'john@example.com',
  image: 'https://example.com/image.jpg',
};

describe('useManageProfile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.URL.createObjectURL = jest.fn(() => 'blob:mock-url');
  });

  it('initializes with correct values', () => {
    const { result } = renderHook(() => useManageProfile(mockUser));

    expect(result.current.imagePreview).toBe(mockUser.image);
    expect(result.current.profilError).toBe(null);
    expect(result.current).toHaveProperty('register');
    expect(result.current).toHaveProperty('handleSubmit');
    expect(result.current).toHaveProperty('onSubmit');
    expect(result.current).toHaveProperty('errors');
    expect(result.current).toHaveProperty('isSubmitting');
    expect(result.current).toHaveProperty('handleImageChange');
  });

  it('updates image preview on file change', () => {
    const { result } = renderHook(() => useManageProfile(mockUser));

    const file = new File(['image-data'], 'avatar.png', { type: 'image/png' });

    act(() => {
      result.current.handleImageChange(file);
    });

    expect(result.current.imagePreview).toContain('blob:');
  });

  it('does not call updateUserProfile if nothing changed', async () => {
    const { result } = renderHook(() => useManageProfile(mockUser));

    await act(async () => {
      await result.current.onSubmit({ ...mockUser });
    });

    expect(updateUserProfile).not.toHaveBeenCalled();
    expect(result.current.profilError).toBe(
      'You must make some changes to update your profile.'
    );
  });

  it('calls updateUserProfile if data changed', async () => {
    const { result } = renderHook(() => useManageProfile(mockUser));

    await act(async () => {
      await result.current.onSubmit({
        name: 'Jane Doe',
        email: mockUser.email,
        image: mockUser.image,
      });
    });

    expect(updateUserProfile).toHaveBeenCalledTimes(1);
  });

  it('sets profilError when updateUserProfile fails', async () => {
    (updateUserProfile as jest.Mock).mockRejectedValueOnce(
      new Error('Server error')
    );

    const { result } = renderHook(() => useManageProfile(mockUser));

    await act(async () => {
      await result.current.onSubmit({
        name: 'Jane Doe',
        email: mockUser.email,
        image: mockUser.image,
      });
    });

    expect(updateUserProfile).toHaveBeenCalled();
    expect(result.current.profilError).toBe(
      'Profile update failed. Please try again.'
    );
  });
});
