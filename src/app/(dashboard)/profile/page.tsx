import ProfileForm from '@/components/profile/ProfileForm';
import { getUser } from '../../../../lib/server/getUser';

/**
 * ProfilePage component that displays the user profile editing interface
 * Fetches the current user data and renders the profile form
 * @returns A page with profile editing form and instructions
 */
const ProfilePage = async () => {
  const user = await getUser();

  if (!user) {
    return;
  }

  return (
    <div className="flex size-full flex-col bg-white p-0 sm:max-w-[1950px] sm:px-18 sm:py-12 sm:shadow-md">
      <h1 className="font-color-theme text-2xl font-bold mb-4">
        Update your profile :
      </h1>
      <p className="mb-6">
        Add your details to create a personal touch to your profile.
      </p>
      <ProfileForm user={user} />
    </div>
  );
};

export default ProfilePage;
