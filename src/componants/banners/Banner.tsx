import { usePathname } from 'next/navigation';
import React from 'react';
import { navItems } from '../../constante/constante';
import NavWrapper from './wrappers/NavWrapper';
import ProfileWrapper from './wrappers/ProfileWrapper';
import IconWrapper from './wrappers/LogoWrapper';
import NavMobile from './NavMobile';
import useIsMobile from '../../hooks/ui/useIsMobile';
import ThemeSwitcher from './ThemeSwitcher';

/**
 * Banner component that displays the navigation bar and profile information
 * @returns The banner component
 */

const Banner = () => {
  const pathname = usePathname();
  const isMobile = useIsMobile();

  if (isMobile) {
    return <NavMobile />;
  }

  return (
    <>
      <nav className="bg-color-theme px-2 sm:px-10 mb-5 h-[60px] w-full py-0 shadow-sm">
        <div className="flex size-full flex-row items-center justify-between ">
          <div className="flex size-full flex-row ">
            <div className="flex items-center justify-center">
              <IconWrapper />
            </div>
            <div className=" ml-12 flex items-center gap-1 font-semibold">
              {navItems.map((item) => (
                <NavWrapper
                  key={item.path}
                  type={item.type}
                  isSelected={pathname === item.path}
                  link={item.path}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-row items-center gap-1 ">
            <div className="banner-link flex items-center p-2 sm:p-4 transition ease-in-out duration-500 rounded-lg">
              <ThemeSwitcher />
            </div>
            <div className="flex flex-row items-center gap-3 ">
              <ProfileWrapper />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Banner;
