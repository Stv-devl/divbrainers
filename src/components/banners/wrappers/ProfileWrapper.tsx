import Image from 'next/image';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import React, { useState } from 'react';
import ThemeSwitcher from '@/components/theme/ThemeSwitcher';
import { iconsMap } from '../../../constante/iconsMap';
import { useUserStore } from '../../../store/useUserStore';

const ProfileWrapper = () => {
  const { user } = useUserStore();
  const [imageError, setImageError] = useState(false);
  const profileImage = typeof user?.image === 'string' ? user.image : '';

  const iconWrapperStyle =
    'sm:banner-link flex items-center p-0 sm:p-3 rounded-lg cursor-pointer';

  const hoverScale = 'hover:scale-105 transition-transform duration-400';

  return (
    <>
      <div className="flex items-center justify-center gap-4 sm:gap-4">
        <Link href="/profile">
          {!imageError && profileImage ? (
            <Image
              src={profileImage}
              width={32}
              height={32}
              className={`rounded-full border object-cover size-7 sm:size-8 ${hoverScale}`}
              alt="Profile"
              priority
              onError={() => setImageError(true)}
            />
          ) : (
            <iconsMap.IconProfile
              width={32}
              height={32}
              className={`rounded-full border-2 border-blue-600 size-8  ${hoverScale}`}
            />
          )}
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
    </>
  );
};

export default ProfileWrapper;
