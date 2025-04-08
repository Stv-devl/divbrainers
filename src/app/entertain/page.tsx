'use client';

import LogoutBanner from '@/componants/banners/LogoutBanner';
import Footer from '@/componants/footer/Footer';
import AdvertisingSection from '@/componants/landing/AdvertisingSection';
import FeaturesSection from '@/componants/landing/FeaturesSection';
import HeroSection from '@/componants/landing/HeroSection';
import Loading from '@/componants/loading/Loading';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const Entertain = () => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/home');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <Loading />;
  }

  return (
    <>
      <LogoutBanner />
      <main className="flex flex-col items-center gap-5 sm:gap-12 px-[5%] ">
        <HeroSection />
        <FeaturesSection />
        <AdvertisingSection />
      </main>
      <Footer />
    </>
  );
};

export default Entertain;
