/**
 * @jest-environment jsdom
 */
import { renderHook, act } from '@testing-library/react';
import { useUserStore } from '@/store/useUserStore';
import { updateUserProfile } from '../../../../lib/actions/user/updateUserProfile';
import useManageProfile from '../useManageProfile';

jest.mock('../../../../lib/actions/updateUserProfile', () => ({
  updateUserProfile: jest.fn(),
}));

jest.mock('@/store/useUserStore', () => ({
  useUserStore: jest.fn(),
}));

const mockUser = {
  name: 'John Doe',
  email: 'john@example.com',
  image: 'https://example.com/image.jpg',
};

describe('useManageProfile hook', () => {
  beforeEach(() => {
    (useUserStore as unknown as jest.Mock).mockReturnValue({ user: mockUser });
    jest.clearAllMocks();
    global.URL.createObjectURL = jest.fn(() => 'blob:mock-url');
  });

  it('should initialize with correct default values', () => {
    const { result } = renderHook(() => useManageProfile());

    expect(result.current).toHaveProperty('register');
    expect(result.current).toHaveProperty('handleSubmit');
    expect(result.current).toHaveProperty('onSubmit');
    expect(result.current).toHaveProperty('errors');
    expect(result.current).toHaveProperty('isSubmitting');
    expect(result.current).toHaveProperty('imagePreview');
    expect(result.current).toHaveProperty('handleImageChange');
    expect(result.current).toHaveProperty('profilError');

    expect(result.current.imagePreview).toBe(mockUser.image);
  });

  it('should update image preview when image is changed', () => {
    const { result } = renderHook(() => useManageProfile());

    const file = new File(['(⌐□_□)'], 'test.png', { type: 'image/png' });

    act(() => {
      result.current.handleImageChange(file);
    });

    expect(result.current.imagePreview).toContain('blob:');
  });

  it('should not call updateUserProfile if no changes made', async () => {
    const { result } = renderHook(() => useManageProfile());

    await act(async () => {
      await result.current.onSubmit({
        name: mockUser.name,
        email: mockUser.email,
        image: mockUser.image,
      });
    });

    expect(result.current.profilError).toBe(
      'You must make some changes to update your profile.'
    );
    expect(updateUserProfile).not.toHaveBeenCalled();
  });

  it('should call updateUserProfile when form data changes', async () => {
    const { result } = renderHook(() => useManageProfile());

    const updatedName = 'Jane Doe';

    await act(async () => {
      await result.current.onSubmit({
        name: updatedName,
        email: mockUser.email,
        image: mockUser.image,
      });
    });

    expect(updateUserProfile).toHaveBeenCalled();
  });

  it('should handle error when updateUserProfile fails', async () => {
    (updateUserProfile as jest.Mock).mockRejectedValueOnce(
      new Error('Server error')
    );

    const { result } = renderHook(() => useManageProfile());

    await act(async () => {
      await result.current.onSubmit({
        name: 'Jane Doe',
        email: mockUser.email,
        image: mockUser.image,
      });
    });

    expect(updateUserProfile).toHaveBeenCalled();
  });
});
