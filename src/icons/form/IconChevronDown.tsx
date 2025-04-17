import React from 'react';

/**
 * IconChevronDown component
 * @param {React.SVGProps<SVGSVGElement>} props - Props for the SVG icon
 * @returns {React.ReactElement}
 */
const IconChevronDown: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      width={props.width || 30}
      height={props.height || 30}
      className={props.className}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
};

export default IconChevronDown;
