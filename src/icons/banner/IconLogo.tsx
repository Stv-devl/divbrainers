import React from 'react';

/**
 * IconLogo component
 * @param {React.SVGProps<SVGSVGElement>} props - The props for the IconLogo component
 * @returns {React.ReactElement} The IconLogo component
 */
const IconLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15 15L3.81 10.53L4.5 27H1.5L2.22 9.885L0 9L15 3L30 9L15 15ZM15 7.5C14.175 7.5 13.5 7.83 13.5 8.25C13.5 8.67 14.175 9 15 9C15.825 9 16.5 8.67 16.5 8.25C16.5 7.83 15.825 7.5 15 7.5ZM15 16.5L23.355 13.155C24.42 14.565 25.155 16.26 25.395 18.105C24.945 18.045 24.48 18 24 18C20.175 18 16.83 20.055 15 23.115C14.0707 21.5565 12.7528 20.2659 11.1753 19.3693C9.59773 18.4728 7.81452 18.0009 6 18C5.52 18 5.055 18.045 4.605 18.105C4.845 16.26 5.58 14.565 6.645 13.155L15 16.5Z"
        fill={props.fill || 'currentColor'}
      />
    </svg>
  );
};

export default IconLogo;
