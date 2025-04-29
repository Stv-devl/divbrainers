import React from 'react';
import { getUser } from '../../../lib/actions/user/getUser';
import NavMobile from './NavMobile';
import IconWrapper from './wrappers/LogoWrapper';
import ProfileWrapper from './wrappers/ProfileWrapper';

/**
 * Banner component that displays the top navigation bar
 * Shows NavMobile on small screens and a fixed header with logo and profile on larger screens
 * @returns The Banner component with appropriate layout based on screen size
 */
const Banner = async () => {
  const user = await getUser();

  if (!user) {
    return;
  }

  return (
    <>
      <div className="block sm:hidden">
        <NavMobile user={user} />
      </div>
      <header className="hidden sm:flex fixed z-10 w-full h-[60px] px-4 shadow-sm bg-color-theme items-center justify-between">
        <IconWrapper />
        <ProfileWrapper user={user} />
      </header>
    </>
  );
};

export default Banner;
