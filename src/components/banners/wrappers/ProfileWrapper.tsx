'use client';

import Image from 'next/image';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import React from 'react';
import ThemeSwitcher from '@/components/ui/theme/ThemeSwitcher';
import { UserProfile } from '@/types/type';
import { iconsMap } from '../../../constante/iconsMap';
import { useProfileImage } from '../../../hooks/ui/useProfileImage';

/**
 * ProfileWrapper component that displays user profile image and navigation icons
 * @param {Object} props - Component props
 * @param {UserProfile} props.user - The user profile data to display
 * @returns A component with profile image and navigation icons (language, theme, logout)
 */
const ProfileWrapper = ({ user }: { user: UserProfile }) => {
  const { profileImage, handleImageError } = useProfileImage(
    typeof user?.image === 'string' ? user.image : null
  );

  const iconWrapperStyle =
    'sm:banner-link flex items-center p-0 sm:p-3 rounded-lg cursor-pointer';

  const hoverScale = 'hover:scale-105 transition-transform duration-400';

  return (
    <div className="flex items-center justify-center gap-4 sm:gap-4">
      <Link href="/profile">
        <Image
          src={profileImage}
          width={32}
          height={32}
          className={`rounded-full border object-cover size-7 sm:size-8 ${hoverScale}`}
          alt="Profile"
          priority
          onError={handleImageError}
        />
      </Link>
      <div className="flex gap-4 sm:gap-0 ">
        <div className={iconWrapperStyle}>
          <iconsMap.IconLanguage className={`size-7 ${hoverScale}`} />
        </div>
        <div className={iconWrapperStyle}>
          <ThemeSwitcher />
        </div>
        <div className={iconWrapperStyle} onClick={() => signOut()}>
          <iconsMap.IconLogout
            className={`hidden sm:block size-6 ${hoverScale}`}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileWrapper;
