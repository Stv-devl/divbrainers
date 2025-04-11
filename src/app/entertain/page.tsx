'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import LogoutBanner from '@/components/banners/LogoutBanner';
import Footer from '@/components/footer/Footer';
import AdvertisingSection from '@/components/landing/AdvertisingSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import HeroSection from '@/components/landing/HeroSection';
import Loading from '@/components/loading/Loading';

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
