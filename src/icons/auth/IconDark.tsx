import React from 'react';

/**
 * IconDark component
 * @param {React.SVGProps<SVGSVGElement>} props - The props for the IconDark component
 * @returns {React.ReactElement} The IconDark component
 */
const IconDark: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width={props.width || 20}
      height={props.height || 20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.5532 13.815C9.66857 13.815 6.51929 10.9278 6.51929 7.36821C6.51929 6.0253 6.96679 4.78158 7.73143 3.75C4.69036 4.69515 2.5 7.33122 2.5 10.4381C2.5 14.3385 5.94929 17.5 10.2036 17.5C13.5929 17.5 16.4696 15.4932 17.5 12.7045C16.375 13.4048 15.0161 13.815 13.5532 13.815Z"
        fill="white"
        stroke={props.stroke || 'currentColor'}
        strokeWidth="1.25"
      />
    </svg>
  );
};

export default IconDark;
