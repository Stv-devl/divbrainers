import React, { SVGProps } from 'react';

/**
 * IconCheck component
 * @param {React.SVGProps<SVGSVGElement>} props - The props for the IconCheck component
 * @returns {React.ReactElement} The IconCheck component
 */
const IconCheck: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width={props.width || 40}
      height={props.height || 40}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      {...props}
    >
      <path
        d="M15 34.0333L4.65002 23.6833L9.36669 18.9666L15 24.6166L31.4667 8.1333L36.1834 12.85L15 34.0333Z"
        fill="#0079FF"
      />
    </svg>
  );
};

export default IconCheck;
