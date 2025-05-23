import React, { SVGProps } from 'react';

/**
 * IconHome component
 * @param {React.SVGProps<SVGSVGElement>} props - The props for the IconHome component
 * @returns {React.ReactElement} The IconHome component
 */
const IconHome: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width={props.width || 30}
      height={props.height || 30}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      {...props}
    >
      <path
        d="M7.5 23.75H11.25V16.25H18.75V23.75H22.5V12.5L15 6.875L7.5 12.5V23.75ZM5 26.25V11.25L15 3.75L25 11.25V26.25H16.25V18.75H13.75V26.25H5Z"
        fill={props.fill || 'currentColor'}
      />
    </svg>
  );
};

export default IconHome;
