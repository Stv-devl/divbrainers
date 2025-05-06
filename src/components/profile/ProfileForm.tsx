'use client';

import Button from '@/components/ui/buttons/Button';
import ProfilePictureWrapper from '@/components/profile/ProfilePictureWrapper';
import ProfileWrapper from '@/components/profile/ProfileWrapper';
import useManageProfile from '@/hooks/manage/useManageProfile';
import { UserProfile } from '@/types/type';

/**
 * ProfileForm component that allows users to edit their profile information
 * @param {Object} props - Component props
 * @param {UserProfile} props.user - The user profile data to be edited
 * @returns A form with profile picture upload, profile information fields and submit button
 */
const ProfileForm = ({ user }: { user: UserProfile }) => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    imagePreview,
    handleImageChange,
    profilError,
  } = useManageProfile(user);

  return (
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
        <span className="flex justify-center text-red-500">{profilError}</span>
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
  );
};

export default ProfileForm;
