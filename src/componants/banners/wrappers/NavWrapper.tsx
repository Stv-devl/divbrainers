import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { NavWrapperProps } from '../../../types/type';

/**
 * NavWrapper component that displays a navigation link
 * @param {Object} props - Component props
 * @param {string} props.type - The type of the link
 * @param {boolean} props.isSelected - Whether the link is selected
 * @param {string} props.link - The link to navigate to
 */
const NavWrapper: React.FC<NavWrapperProps> = ({
  type,
  isSelected,
  link,
  onClick,
}: NavWrapperProps) => {
  return (
    <Link
      className={twMerge(
        'banner-link flex items-center h-[40px] p-3 transition ease-in-out duration-500 sm:rounded-lg',
        clsx({
          'bg-blue-100 dark:bg-gray-50 dark:text-indigo-700': isSelected,
        })
      )}
      href={link}
      onClick={onClick}
    >
      {type}
    </Link>
  );
};

export default NavWrapper;
