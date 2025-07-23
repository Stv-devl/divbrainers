'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { useClientTranslation } from '@/hooks/i18n/useClientTranslation';
import { iconsMap } from '../../constante/iconsMap';
import LanguageSwitcher from '../ui/Languages/LanguageSwitcher';
import ThemeSwitcher from '../ui/theme/ThemeSwitcher';
import IconWrapper from './wrappers/LogoWrapper';

/**
 * Banner component that displays the navigation bar with login and register links
 * @returns The banner component
 */
const LogoutBanner = () => {
  const pathname = usePathname();
  const [isLangOpen, setIsLangOpen] = useState(false);

  const { t, isClient } = useClientTranslation();

  if (!isClient) return null;

  return (
    <>
      <nav className="bg-color-theme px-2 sm:px-10 mb-5 h-[70px] w-full py-0 shadow-sm">
        <div className="flex size-full items-center justify-between ">
          <div className="hidden sm:block">
            <IconWrapper />
          </div>
          <iconsMap.IconLogo className="block sm:hidden size-6 mr-2" />
          <div className="flex items-center sm:gap-4 font-medium sm:font-semibold text-blue-900 text-sm sm:text-base">
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
              {t('logoutNavBar.login')}
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
              {t('logoutNavBar.register')}
            </Link>
            <div
              className="sm:banner-link flex items-center p-0 sm:p-3 rounded-lg  cursor-pointer"
              onClick={() => setIsLangOpen(!isLangOpen)}
            >
              <iconsMap.IconLanguage
                className={`size-5 sm:size-7 hover:scale-105 transition-transform duration-400`}
              />
            </div>
            <div className="sm:banner-link flex items-center p-2 sm:p-4 transition ease-in-out duration-500 rounded-lg">
              <ThemeSwitcher />
            </div>
          </div>
        </div>
        <LanguageSwitcher
          isOpen={isLangOpen}
          onClose={() => setIsLangOpen(false)}
        />
      </nav>
    </>
  );
};

export default LogoutBanner;
