'use client';

import React from 'react';
import LogoutBanner from '@/componants/banners/LogoutBanner';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LogoutBanner />
      <main>
        <section className="flex h-screen w-full flex-col sm:mt-10 sm:rounded-lg">
          <div className="mt-5 flex w-full flex-col items-center  sm:mt-10">
            <div className="bg-color-theme flex flex-col items-start gap-10 sm:rounded-lg p-6 w-full sm:w-[476px] sm:p-10 sm:shadow-md">
              {children}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
