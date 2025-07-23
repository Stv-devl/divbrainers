'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import { navItems } from '@/constante/constante';
import { useClientTranslation } from '@/hooks/i18n/useClientTranslation';
import NavWrapper from './wrappers/NavWrapper';

/**
 * Lateral banner component that displays navigation items
 * @returns The lateral banner component
 */
const LateralBanner = () => {
  const pathname = usePathname();
  const { t, isClient } = useClientTranslation();

  if (!isClient) return null;

  return (
    <nav className="hidden sm:block fixed z-10 left-0 top-18 h-full bg-white w-[120px] pt-4 shadow-sm">
      <div className="flex flex-col gap-4 w-full">
        {navItems.map((item) => (
          <NavWrapper
            key={item.path}
            type={t(item.type)}
            isSelected={pathname === item.path}
            link={item.path}
            icon={item.icon}
          />
        ))}
      </div>
    </nav>
  );
};

export default LateralBanner;
