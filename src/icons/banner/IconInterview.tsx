import React, { SVGProps } from 'react';

/**
 * IconInterview component
 * @param {React.SVGProps<SVGSVGElement>} props - The props for the IconInterview component
 * @returns {React.ReactElement} The IconInterview component
 */
const IconInterview: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width={props.width || 28}
      height={props.height || 22}
      viewBox="0 0 28 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      {...props}
    >
      <path
        d="M17.3825 1.39127H10.6175C9.79972 1.39094 8.98988 1.55175 8.23425 1.86452C7.47863 2.17728 6.79204 2.63587 6.21372 3.21408C5.63539 3.79229 5.17666 4.47879 4.86375 5.23435C4.55083 5.98991 4.38985 6.79972 4.39002 7.61752V14.3825C4.38969 15.2004 4.55054 16.0104 4.86339 16.7661C5.17623 17.5218 5.63493 18.2084 6.21328 18.7868C6.79162 19.3651 7.47826 19.8238 8.23397 20.1366C8.98967 20.4495 9.79962 20.6103 10.6175 20.61H17.3825C18.2004 20.6103 19.0104 20.4495 19.7661 20.1366C20.5218 19.8238 21.2084 19.3651 21.7868 18.7868C22.3651 18.2084 22.8238 17.5218 23.1366 16.7661C23.4495 16.0104 23.6103 15.2004 23.61 14.3825V7.61752C23.6103 6.79962 23.4495 5.98967 23.1366 5.23397C22.8238 4.47826 22.3651 3.79162 21.7868 3.21328C21.2084 2.63493 20.5218 2.17623 19.7661 1.86339C19.0104 1.55054 18.2004 1.38969 17.3825 1.39002V1.39127Z"
        stroke="#1c398e"
        strokeWidth="1.875"
      />
      <path
        d="M23.5075 15.485H25.5313C25.8711 15.485 26.197 15.35 26.4372 15.1097C26.6775 14.8694 26.8125 14.5435 26.8125 14.2037V7.79748C26.8125 7.45768 26.6775 7.13179 26.4372 6.89151C26.197 6.65122 25.8711 6.51624 25.5313 6.51624H23.5062M4.49375 15.485H2.46875C2.30049 15.485 2.13389 15.4518 1.97844 15.3875C1.82299 15.3231 1.68174 15.2287 1.56277 15.1097C1.44379 14.9907 1.34942 14.8495 1.28503 14.694C1.22064 14.5386 1.1875 14.372 1.1875 14.2037V7.79748C1.1875 7.45768 1.32249 7.13179 1.56277 6.89151C1.80305 6.65122 2.12894 6.51624 2.46875 6.51624H4.49375"
        stroke="#1c398e"
        strokeWidth="1.875"
      />
      <path
        d="M2.45624 6.51624V1.39124M25.5312 6.51624L25.5187 1.39124M10.1437 6.95373V10.3262M17.8312 6.95373V10.3262M11.425 15.485H16.55"
        stroke="#1c398e"
        strokeWidth="1.875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconInterview;
