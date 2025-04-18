import React from 'react';

/**
 * IconClose component
 * @param {React.SVGProps<SVGSVGElement>} props - Props for the SVG icon
 * @returns {React.ReactElement}
 */
const IconClose: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      width={props.width || 20}
      height={props.height || 20}
      className={props.className}
      {...props}
    >
      <path
        d="M14.0625 5.9375L5.9375 14.0625M5.9375 5.9375L14.0625 14.0625"
        stroke="#0255B0"
        strokeWidth="1.875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconClose;
