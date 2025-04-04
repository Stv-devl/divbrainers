import Image from 'next/image';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import React, { useState } from 'react';
import { useUserStore } from '../../../store/useUserStore';
import { iconsMap } from '../../../constante/iconsMap';

/**
 * ProfileWrapper component that displays the profile information
 * @returns The ProfileWrapper component
 */
const ProfileWrapper = () => {
  const { user } = useUserStore();
  const [imageError, setImageError] = useState(false);
  const profileImage = typeof user?.image === 'string' ? user.image : '';

  return (
    <>
      <Link href="/profile" className="min-w-[48px]">
        {!imageError && profileImage && profileImage !== '' ? (
          <Image
            src={profileImage}
            width={48}
            height={48}
            className="size-[40px] rounded-full border-2 object-cover text-darkest-blue"
            alt="Profile"
            priority
            onError={() => setImageError(true)}
          />
        ) : (
          <iconsMap.IconProfile
            width={50}
            height={50}
            className="size-[40px] rounded-full border-2 border-blue-600"
          />
        )}
      </Link>
      <div
        className="items-centerml-2 flex cursor-pointer"
        onClick={() => signOut()}
      >
        <iconsMap.IconLogout
          fill={'#08396F'}
          className="size-[25px] w-[35px]"
        />
      </div>
    </>
  );
};

export default ProfileWrapper;
