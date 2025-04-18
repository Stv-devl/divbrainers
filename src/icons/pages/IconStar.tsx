import React from 'react';

/**
 * IconStar component
 * @param {React.SVGProps<SVGSVGElement>} props - Props for the SVG icon
 * @returns {React.ReactElement}
 */
const IconStar: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 25 25"
      fill="none"
      stroke="currentColor"
      width={props.width || 25}
      height={props.height || 25}
      className={props.className}
      {...props}
    >
      <path
        d="M12.5002 18.4896L6.07103 21.8698L7.29915 14.7104L2.09082 9.6406L9.27832 8.59893L12.4929 2.08539L15.7075 8.59893L22.895 9.6406L17.6867 14.7104L18.9148 21.8698L12.5002 18.4896Z"
        stroke="#08396F"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconStar;
