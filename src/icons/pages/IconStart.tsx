import React from 'react';

/**
 * IconStart component
 * @param {React.SVGProps<SVGSVGElement>} props - Props for the SVG icon
 * @returns {React.ReactElement}
 */
const IconStart: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="none"
      width={props.width || 20}
      height={props.height || 20}
      className={props.className}
      {...props}
    >
      <path
        d="M1.875 18.1375C1.875 18.4931 2.17312 18.7487 2.5 18.75C2.60188 18.75 2.70625 18.7256 2.80562 18.6719L17.7969 10.5344C18.0119 10.4181 18.125 10.2094 18.125 10C18.125 9.79062 18.0119 9.58125 17.7969 9.465L2.80625 1.3275C2.71249 1.27587 2.60704 1.24918 2.5 1.25C2.17312 1.25125 1.875 1.50687 1.875 1.8625V18.1375Z"
        fill="white"
      />
    </svg>
  );
};

export default IconStart;
