import React from 'react';

/**
 * IconStop component
 * @param {React.SVGProps<SVGSVGElement>} props - Props for the SVG icon
 * @returns {React.ReactElement}
 */
const IconStart: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 30"
      fill="none"
      width={props.width || 30}
      height={props.height || 30}
      className={props.className}
      {...props}
    >
      <path
        d="M7.5 20V10C7.5 9.3125 7.745 8.72417 8.235 8.235C8.725 7.74583 9.31333 7.50083 10 7.5H20C20.6875 7.5 21.2762 7.745 21.7663 8.235C22.2563 8.725 22.5008 9.31333 22.5 10V20C22.5 20.6875 22.2554 21.2762 21.7663 21.7663C21.2771 22.2563 20.6883 22.5008 20 22.5H10C9.3125 22.5 8.72417 22.2554 8.235 21.7663C7.74583 21.2771 7.50083 20.6883 7.5 20Z"
        fill="white"
      />
    </svg>
  );
};

export default IconStart;
