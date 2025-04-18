'use client';

import React, { useEffect } from 'react';
import Banner from '@/components/banners/Banner';
import LateralBanner from '@/components/banners/LateralBanner';
import Footer from '@/components/footer/Footer';
import { useUserStore } from '@/store/useUserStore';
import { UserProfile } from '@/types/type';

/**
 * Client component for the main layout
 * @param user - The user profile data
 * @param children - The content to be rendered inside the layout
 * @returns The layout with the content
 */
const MainLayoutClient: React.FC<{
  user: UserProfile;
  children: React.ReactNode;
}> = ({ user, children }) => {
  const { setUser } = useUserStore();

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  return (
    <>
      <Banner />
      <div className="hidden sm:block fixed top-15 left-0 z-50 h-3 w-full bg-gray-100 " />
      <LateralBanner />
      <div className="sm:ml-[120px] pt-[4px] flex flex-col gap-4">
        <main className="flex flex-col gap-5 pt-5 sm:pt-0 px-5 sm:mt-[69px] min-h-screen">
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default MainLayoutClient;
