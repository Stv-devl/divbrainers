'use client';

import React, { useEffect } from 'react';
import { useUserStore } from '@/store/useUserStore';
import Banner from '@/componants/banners/Banner';
import Footer from '@/componants/footer/Footer';
import { UserProfile } from '@/types/type';

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
      <main className="relative flex items-center justify-center size-full flex-col gap-5 px-5 sm:mt-5">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default MainLayoutClient;
