import React from 'react';

/**
 * IconBack component
 * @param {React.SVGProps<SVGSVGElement>} props - Props for the SVG icon
 * @returns {React.ReactElement}
 */
const IconBack: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 30"
      fill="none"
      stroke="currentColor"
      width={props.width || 30}
      height={props.height || 30}
      className={props.className}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.5 25.5225C24.4417 21.7892 21.7258 19.6708 19.3525 19.1675C16.9792 18.6642 14.7196 18.5881 12.5737 18.9394V25.625L2.5 14.7156L12.5737 4.375V10.7294C16.5417 10.7606 19.915 12.1842 22.6938 15C25.4721 17.8158 27.0742 21.3233 27.5 25.5225Z"
        fill="#08396F"
        stroke="#08396F"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconBack;
