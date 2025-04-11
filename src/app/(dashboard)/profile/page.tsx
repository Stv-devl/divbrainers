'use client';

import React from 'react';
import Button from '@/components/buttons/Button';
import ProfilePictureWrapper from '@/components/profile/ProfilePictureWrapper';
import ProfileWrapper from '@/components/profile/ProfileWrapper';
import useManageProfile from '@/hooks/manage/useManageProfile';

const Profile = () => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    imagePreview,
    handleImageChange,
    profilError,
  } = useManageProfile();

  return (
    <div className="flex w-full flex-col bg-white p-0 sm:max-w-screen-xl sm:px-18 sm:py-12 sm:shadow-md">
      <h1 className="font-color-theme text-2xl font-bold mb-4">
        Update your profile :
      </h1>
      <p className="mb-6">
        Add your details to create a personal touch to your profile.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="relative"
      >
        <div className="bg-gray-50 mb-6 rounded-lg">
          <ProfilePictureWrapper
            imagePreview={imagePreview}
            handleImageChange={handleImageChange}
          />
        </div>
        <div className="bg-gray-50 mb-6 rounded-lg">
          <ProfileWrapper register={register} errors={errors} />
        </div>
        {profilError && (
          <span className="flex justify-center text-red-500">
            {profilError}
          </span>
        )}
        <div className="mb-6 flex w-full justify-end border-b border-gray-200">
          <div className="mb-6 h-[40px] w-1/2 sm:w-[100px]">
            <Button
              label="Edit"
              type="submit"
              color="filled"
              disabled={isSubmitting}
              isLoading={isSubmitting}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
