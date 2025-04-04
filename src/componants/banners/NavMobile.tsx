import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import React from 'react';
import { iconsMap } from '../../constante/iconsMap';
import { navItems } from '../../constante/constante';
import NavWrapper from './wrappers/NavWrapper';
import ProfileWrapper from './wrappers/ProfileWrapper';

/**
 * NavMobile component that displays the mobile navigation bar
 * @returns The NavMobile component
 */

const NavMobile = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleBurger = () => setIsOpen((prev) => !prev);

  const pathname = usePathname();

  return (
    <>
      <nav className="mb-5 flex flex-row justify-between gap-5 bg-white p-2">
        <div
          className="flex cursor-pointer items-center"
          onClick={toggleBurger}
        >
          {!isOpen ? <iconsMap.IconVector fill={'#08396F'} /> : ''}
        </div>
        <iconsMap.IconLogo className="ml-2 size-10" />
        <div className="flex flex-row items-center gap-2 lg:flex-col ">
          <ProfileWrapper />
        </div>
      </nav>

      <div
        className={clsx(
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
