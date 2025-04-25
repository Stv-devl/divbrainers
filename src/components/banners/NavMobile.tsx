'use client';

import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import React from 'react';
import { UserProfile } from '@/types/type';
import { cn } from '../../../lib/utils/cn';
import { navItems } from '../../constante/constante';
import { iconsMap } from '../../constante/iconsMap';
import NavWrapper from './wrappers/NavWrapper';
import ProfileWrapper from './wrappers/ProfileWrapper';

/**
 * NavMobile component that displays the mobile navigation bar
 * @returns The NavMobile component
 */
const NavMobile = ({ user }: { user: UserProfile }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleBurger = () => setIsOpen((prev) => !prev);

  const pathname = usePathname();

  return (
    <>
      <nav className="flex flex-row items-center justify-between gap-5 bg-white p-2">
        <div
          className="flex cursor-pointer items-center"
          onClick={toggleBurger}
        >
          {!isOpen ? <iconsMap.IconVector fill={'#08396F'} /> : ''}
        </div>
        <h1 className="font-color-theme text-xl font-semibold">DivBrainers</h1>
        <div
          className="banner-link flex items-center p-3 transition duration-300 ease-in-out rounded-lg cursor-pointer"
          onClick={() => signOut()}
        >
          <iconsMap.IconLogout className="size-7 hover:scale-105 transition-transform duration-400" />
        </div>
      </nav>

      <div
        className={cn(
          'fixed left-0 top-0 z-[100] flex w-[150px] flex-col gap-1 rounded-r-lg bg-white py-3 font-semibold transition-transform ease-in-out shadow-md',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'duration-400'
        )}
      >
        <iconsMap.IconLogo className="mx-auto size-10" />
        {navItems.map((item) => (
          <NavWrapper
            key={item.path}
            type={item.type}
            isSelected={pathname === item.path}
            link={item.path}
            onClick={toggleBurger}
          />
        ))}
        <ProfileWrapper user={user} />
      </div>

      {isOpen && (
        <div
          className="fixed left-0 top-0 z-[99] h-screen w-screen bg-darkest-gray opacity-60"
          onClick={toggleBurger}
        ></div>
      )}
    </>
  );
};

export default NavMobile;
