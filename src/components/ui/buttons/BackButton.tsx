'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { iconsMap } from '@/constante/iconsMap';

interface BackButtonProps {
  handleDisconnect?: () => void;
  route: string;
  position?: string;
}

const BackButton = ({ handleDisconnect, route, position }: BackButtonProps) => {
  const router = useRouter();

  const handleNavigation = () => {
    if (handleDisconnect) handleDisconnect();
    router.push(route);
  };

  return (
    <div
      onClick={handleNavigation}
      className={`absolute flex items-center justify-center bg-blue-100 sm:size-10 size-8 rounded-md cursor-pointer transition-all duration-300 hover:scale-105 ${position}`}
    >
      <iconsMap.IconBack className="size-5 sm:size-6" />
    </div>
  );
};

export default BackButton;
