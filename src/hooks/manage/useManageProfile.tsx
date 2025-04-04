'use client';

import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useUserStore } from '@/store/useUserStore';
import { UserProfile } from '@/types/type';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateUserProfile } from '../../../lib/actions/updateUserProfile';
import {
  ProfileFormData,
  profileSchema,
} from '../../../lib/shema/profileShema';

/**
 * Custom hook for managing user profile updates
 * @returns {Object} An object containing:
 * - register: Form registration function from react-hook-form
 * - handleSubmit: Form submission handler from react-hook-form
 * - onSubmit: Function to process form submission
 * - errors: Form validation errors
 * - isSubmitting: Boolean indicating if form is currently submitting
 * - imagePreview: URL string for profile image preview
 * - handleImageChange: Function to handle profile image changes
 * - profilError: Error message string if profile update fails
 */
const useManageProfile = () => {
  const { user } = useUserStore();

  const initialProfile = useRef<UserProfile | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    user?.image ? String(user.image) : null
  );

  const [profilError, setProfilError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      image: user?.image || '',
    },
  });

  useEffect(() => {
    if (user) {
      initialProfile.current = user;
      if (user.image) setImagePreview(String(user.image));
      reset({
        name: user.name || '',
        email: user.email || '',
        image: typeof user.image === 'string' ? user.image : '',
      });
    }
  }, [user, reset]);

  /**
   * Handles profile image change
   * @param {File} selectedFile - The selected image file
   */
  const handleImageChange = (selectedFile: File) => {
    setFile(selectedFile);
    setImagePreview(URL.createObjectURL(selectedFile));
  };

  /**
   * Processes form submission for profile update
   * @param {ProfileFormData} data - Form data from react-hook-form
   */
  const onSubmit = async (data: ProfileFormData) => {
    setProfilError(null);

    const updatedFields: Partial<UserProfile> = {
      name: data.name.trim(),
      email: data.email.trim(),
      image: file ? imagePreview : initialProfile.current?.image ?? null,
    };

    const hasChanges = Object.entries(updatedFields).some(
      ([key, value]) =>
        value !== initialProfile.current?.[key as keyof UserProfile]
    );

    if (!hasChanges) {
      setProfilError('You must make some changes to update your profile.');
      return;
    }

    const formData = new FormData();
    if (updatedFields.name) formData.set('name', updatedFields.name);
    if (updatedFields.email) formData.set('email', updatedFields.email);
    if (file) formData.set('image', file);

    await updateUserProfile(formData);
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    imagePreview,
    handleImageChange,
    profilError,
  };
};

export default useManageProfile;
