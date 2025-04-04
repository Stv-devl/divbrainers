import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { iconsMap } from '../../constante/iconsMap';
import ThemeSwitcher from './ThemeSwitcher';
import IconWrapper from './wrappers/LogoWrapper';

/**
 * Banner component that displays the navigation bar with login and register links
 * @returns The banner component
 */
const LogoutBanner = () => {
  const pathname = usePathname();

  return (
    <>
      <nav className="bg-color-theme px-2 sm:px-10 mb-5 h-[70px] w-full py-0 shadow-sm">
        <div className="flex size-full items-center justify-between ">
          <IconWrapper />
          <div className="flex items-center sm:gap-4 font-medium sm:font-semibold text-blue-900 ">
            <Link
              href="/login"
              className={twMerge(
                'banner-link flex items-center p-2 sm:p-4 transition ease-in-out duration-500 rounded-lg',
                clsx({
                  'bg-blue-100 dark:bg-gray-50 dark:text-indigo-700':
                    pathname === '/login',
                })
              )}
            >
              <iconsMap.IconLogin className="hidden sm:block size-6 mr-2" />{' '}
              Login
            </Link>
            <Link
              href="/signup"
              className={twMerge(
                'banner-link flex items-center p-2 sm:p-4 transition ease-in-out duration-750 rounded-lg',
                clsx({
                  'bg-blue-100 dark:bg-gray-50 dark:text-indigo-700':
                    pathname === '/signup',
                })
              )}
            >
              Register
            </Link>
            <div className="banner-link flex items-center p-2 sm:p-4 transition ease-in-out duration-500 rounded-lg">
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default LogoutBanner;
