import React from 'react';
import Banner from '@/components/banners/Banner';
import LateralBanner from '@/components/banners/LateralBanner';
import Footer from '@/components/footer/Footer';

/**
 * MainLayout component that provides the dashboard layout structure
 * Includes the main banner, lateral navigation, content area and footer
 * @param {React.ReactNode} children - The content to be rendered within the layout
 * @returns The complete dashboard layout with all navigation elements
 */
const MainLayout = ({ children }: { children: React.ReactNode }) => {
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

export default MainLayout;
