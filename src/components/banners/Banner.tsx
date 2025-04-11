import React from 'react';
import NavMobile from './NavMobile';
import IconWrapper from './wrappers/LogoWrapper';
import ProfileWrapper from './wrappers/ProfileWrapper';

const Banner = () => {
  return (
    <>
      <div className="block sm:hidden">
        <NavMobile />
      </div>
      <header className="hidden sm:flex fixed z-50 w-full h-[60px] px-4 shadow-sm bg-color-theme items-center justify-between">
        <IconWrapper />
        <ProfileWrapper />
      </header>
    </>
  );
};

export default Banner;
