import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { iconsMap } from '@/constante/iconsMap';
import { NavWrapperProps } from '../../../types/type';

/**
 * NavWrapper component that displays a navigation link
 * @param {Object} props - Component props
 * @param {string} props.type - The type of the link
 * @param {boolean} props.isSelected - Whether the link is selected
 * @param {string} props.link - The link to navigate to
 * @param {Function} props.onClick - Optional click handler
 * @param {string} props.icon - Icon name to display
 */
const NavWrapper: React.FC<NavWrapperProps> = ({
  type,
  isSelected,
  link,
  onClick,
  icon,
}: NavWrapperProps) => {
  const IconComponent = iconsMap[icon as keyof typeof iconsMap];

  return (
    <Link
      className={twMerge(
        'banner-link font-semibold flex items-center gap-2 pl-2 justify-start h-10 w-full transition ease-in-out duration-500',
        clsx({
          'bg-blue-100 dark:bg-gray-50 dark:text-indigo-700': isSelected,
        })
      )}
      href={link}
      onClick={onClick}
    >
      {IconComponent && <IconComponent className="size-5 min-w-5" />}
      <span>{type}</span>
    </Link>
  );
};

export default NavWrapper;
