import React from 'react';
import { iconsMap } from '../../../constante/iconsMap';

const LogoWrapper = () => {
  return (
    <div className="flex items-center gap-1 sm:gap-3">
      <iconsMap.IconLogo className="size-8 sm:size-12" />
      <h2 className="font-color-theme sm:text-xl font-semibold">DivBrainers</h2>
    </div>
  );
};

export default LogoWrapper;
