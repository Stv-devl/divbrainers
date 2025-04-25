import React from 'react';
import { iconsMap } from '../../../constante/iconsMap';

/**
 * LogoWrapper component that displays the application logo and name
 * @returns A component with the logo icon and application name
 */
const LogoWrapper = () => {
  return (
    <div className="flex items-center gap-1 sm:gap-3">
      <iconsMap.IconLogo className="size-8 sm:size-12" />
      <h2 className="font-color-theme sm:text-xl font-semibold">DivBrainers</h2>
    </div>
  );
};

export default LogoWrapper;
