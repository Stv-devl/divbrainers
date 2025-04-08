import React, { SVGProps } from 'react';

/**
 * IconStats component
 * @param {React.SVGProps<SVGSVGElement>} props - The props for the IconStats component
 * @returns {React.ReactElement} The IconStats component
 */
const IconStats: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width={props.width || 55}
      height={props.height || 55}
      viewBox="0 0 55 55"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      {...props}
    >
      <path
        d="M12.5 30H2.5C1 30 0 31 0 32.5V52.5C0 54 1 55 2.5 55H12.5C14 55 15 54 15 52.5V32.5C15 31 14 30 12.5 30ZM52.5 20H42.5C41 20 40 21 40 22.5V52.5C40 54 41 55 42.5 55H52.5C54 55 55 54 55 52.5V22.5C55 21 54 20 52.5 20ZM32.5 0H22.5C21 0 20 1 20 2.5V52.5C20 54 21 55 22.5 55H32.5C34 55 35 54 35 52.5V2.5C35 1 34 0 32.5 0Z"
        fill="#0079FF"
      />
    </svg>
  );
};

export default IconStats;
