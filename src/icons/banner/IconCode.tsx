import React, { SVGProps } from 'react';

/**
 * IconCode component
 * @param {React.SVGProps<SVGSVGElement>} props - The props for the IconCode component
 * @returns {React.ReactElement} The IconCode component
 */
const IconCode: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width={props.width || 30}
      height={props.height || 30}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      {...props}
    >
      <g clipPath="url(#clip0_28_6)">
        <path
          d="M18.275 3.32749C18.5123 3.39387 18.7341 3.50636 18.9279 3.65853C19.1216 3.8107 19.2835 3.99957 19.4042 4.21433C19.525 4.42909 19.6022 4.66554 19.6315 4.91017C19.6608 5.15479 19.6416 5.40279 19.575 5.63999L14.0363 25.3737C13.902 25.8526 13.583 26.2586 13.1494 26.5022C12.7159 26.7459 12.2033 26.8074 11.7244 26.6731C11.2455 26.5388 10.8396 26.2198 10.5959 25.7863C10.3522 25.3527 10.2907 24.8401 10.425 24.3612L15.9638 4.62499C16.0303 4.38784 16.1429 4.16612 16.2951 3.9725C16.4473 3.77887 16.6362 3.61714 16.8509 3.49653C17.0657 3.37592 17.3021 3.29881 17.5467 3.26959C17.7912 3.24037 18.0391 3.25962 18.2763 3.32624L18.275 3.32749ZM9.45001 8.37124C9.80113 8.72281 9.99836 9.19937 9.99836 9.69624C9.99836 10.1931 9.80113 10.6697 9.45001 11.0212L5.47501 15L9.45251 18.9775C9.80408 19.3292 10.0015 19.8062 10.0014 20.3036C10.0013 20.8009 9.80363 21.2778 9.45188 21.6294C9.10014 21.9809 8.62314 22.1784 8.12581 22.1783C7.62849 22.1782 7.15158 21.9805 6.80001 21.6287L1.49626 16.325C1.14513 15.9734 0.947906 15.4969 0.947906 15C0.947906 14.5031 1.14513 14.0266 1.49626 13.675L6.79876 8.37124C6.97288 8.197 7.17963 8.05879 7.4072 7.96448C7.63476 7.87018 7.87868 7.82164 8.12501 7.82164C8.37134 7.82164 8.61525 7.87018 8.84282 7.96448C9.07038 8.05879 9.27588 8.197 9.45001 8.37124ZM20.55 11.0212C20.3658 10.8496 20.218 10.6426 20.1156 10.4126C20.0131 10.1826 19.958 9.93431 19.9535 9.68255C19.9491 9.43079 19.9954 9.18072 20.0897 8.94725C20.184 8.71378 20.3244 8.50169 20.5024 8.32365C20.6805 8.1456 20.8925 8.00524 21.126 7.91094C21.3595 7.81663 21.6096 7.77032 21.8613 7.77476C22.1131 7.7792 22.3614 7.83431 22.5914 7.93679C22.8214 8.03927 23.0284 8.18703 23.2 8.37124L28.5038 13.6737C28.8553 14.0254 29.0527 14.5022 29.0527 14.9994C29.0527 15.4966 28.8553 15.9734 28.5038 16.325L23.2013 21.6287C23.0272 21.8029 22.8205 21.9411 22.593 22.0354C22.3655 22.1297 22.1217 22.1782 21.8754 22.1783C21.6292 22.1783 21.3853 22.1299 21.1578 22.0357C20.9303 21.9415 20.7235 21.8034 20.5494 21.6294C20.3752 21.4553 20.237 21.2486 20.1428 21.0211C20.0485 20.7936 19.9999 20.5498 19.9998 20.3036C19.9998 20.0573 20.0482 19.8135 20.1424 19.5859C20.2366 19.3584 20.3747 19.1517 20.5488 18.9775L24.5263 15L20.55 11.0212Z"
          fill={props.fill || 'currentColor'}
        />
      </g>
      <defs>
        <clipPath id="clip0_28_6">
          <rect width="30" height="30" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default IconCode;
