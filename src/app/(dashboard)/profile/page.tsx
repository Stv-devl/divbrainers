import ProfileForm from '@/components/profile/ProfileForm';
import ProfileTitleWrapper from '@/components/profile/ProfileTitleWrapper';
import { getUser } from '../../../../lib/serveur/getUser';

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
      <ProfileTitleWrapper />
      <ProfileForm user={user} />
    </div>
  );
};

export default ProfilePage;
