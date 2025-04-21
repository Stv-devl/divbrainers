import React from 'react';

/**
 * IconBreak component
 * @param {React.SVGProps<SVGSVGElement>} props - Props for the SVG icon
 * @returns {React.ReactElement}
 */
const IconBreak: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 30"
      fill="none"
      width={props.width || 30}
      height={props.height || 30}
      className={`outline-none border-none ${props.className ?? ''}`}
      {...props}
    >
      <path
        d="M20 23.75C19.3125 23.75 18.7242 23.5054 18.235 23.0163C17.7458 22.5271 17.5008 21.9383 17.5 21.25V8.75C17.5 8.0625 17.745 7.47417 18.235 6.985C18.725 6.49584 19.3133 6.25084 20 6.25C20.6867 6.24917 21.2754 6.49417 21.7663 6.985C22.2571 7.47584 22.5017 8.06417 22.5 8.75V21.25C22.5 21.9375 22.2554 22.5263 21.7663 23.0163C21.2771 23.5063 20.6883 23.7508 20 23.75ZM10 23.75C9.3125 23.75 8.72417 23.5054 8.235 23.0163C7.74583 22.5271 7.50083 21.9383 7.5 21.25V8.75C7.5 8.0625 7.745 7.47417 8.235 6.985C8.725 6.49584 9.31333 6.25084 10 6.25C10.6867 6.24917 11.2754 6.49417 11.7663 6.985C12.2571 7.47584 12.5017 8.06417 12.5 8.75V21.25C12.5 21.9375 12.2554 22.5263 11.7663 23.0163C11.2771 23.5063 10.6883 23.7508 10 23.75Z"
        fill="white"
      />
    </svg>
  );
};

export default IconBreak;
