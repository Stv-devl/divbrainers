import React from 'react';

/**
 * IconReload component
 * @param {React.SVGProps<SVGSVGElement>} props - Props for the SVG icon
 * @returns {React.ReactElement}
 */
const IconReload: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      width={props.width || 16}
      height={props.height || 16}
      className={props.className}
      {...props}
    >
      <g clipPath="url(#clip0_70_239)">
        <path
          d="M10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C12.75 20 15.3 18.925 17.1 17.1L15.3 15.3C13.95 16.65 12.075 17.5 9.975 17.5C5.825 17.5 2.475 14.15 2.475 10C2.475 5.85 5.825 2.5 9.975 2.5C12.05 2.5 13.85 3.4 15.2 4.775L12.475 7.5H19.975V0L17 2.975C15.2 1.175 12.725 0 9.975 0H10Z"
          fill="#08396F"
        />
      </g>
      <defs>
        <clipPath id="clip0_70_239">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default IconReload;
