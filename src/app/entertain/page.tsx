'use client';

import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import LogoutBanner from '@/components/banners/LogoutBanner';
import Footer from '@/components/footer/Footer';
import AdvertisingSection from '@/components/landing/AdvertisingSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import HeroSection from '@/components/landing/HeroSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import StatsSection from '@/components/landing/StatsSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import Loading from '@/components/loading/Loading';

const Entertain = () => {
  const { status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      window.location.href = '/home';
    }
  }, [status]);

  if (status === 'loading') {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <LogoutBanner />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <StatsSection />
        <TestimonialsSection />
        <AdvertisingSection />
      </main>
      <Footer />
    </div>
  );
};

export default Entertain;
