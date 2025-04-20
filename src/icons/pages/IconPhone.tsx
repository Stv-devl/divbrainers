import React from 'react';

/**
 * IconPhone component
 * @param {React.SVGProps<SVGSVGElement>} props - Props for the SVG icon
 * @returns {React.ReactElement}
 */
const IconPhone: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      fill="none"
      stroke="currentColor"
      width={props.width || 50}
      height={props.height || 50}
      className={props.className}
      {...props}
    >
      <path
        d="M34.4917 26.8875L33.5437 27.8313C33.5437 27.8313 31.2875 30.0729 25.1312 23.9521C18.975 17.8313 21.2312 15.5896 21.2312 15.5896L21.8271 14.9938C23.3 13.5313 23.4396 11.1813 22.1542 9.46459L19.5292 5.95834C17.9375 3.83334 14.8646 3.55209 13.0417 5.36459L9.77083 8.61459C8.86874 9.51459 8.26458 10.6771 8.33749 11.9688C8.52499 15.275 10.0208 22.3854 18.3625 30.6813C27.2104 39.4771 35.5125 39.8271 38.9062 39.5104C39.9812 39.4104 40.9146 38.8646 41.6667 38.1146L44.625 35.1729C46.625 33.1875 46.0625 29.7813 43.5042 28.3917L39.525 26.2271C37.8458 25.3167 35.8042 25.5833 34.4917 26.8875Z"
        fill="#08396F"
      />
    </svg>
  );
};

export default IconPhone;
