import React, { SVGProps } from 'react';

/**
 * IconQuiz component
 * @param {React.SVGProps<SVGSVGElement>} props - The props for the IconQuiz component
 * @returns {React.ReactElement} The IconQuiz component
 */
const IconQuiz: React.FC<SVGProps<SVGSVGElement>> = (props) => {
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
      <path
        d="M7.5 27.5C6.8125 27.5 6.22417 27.2554 5.735 26.7663C5.24583 26.2771 5.00083 25.6883 5 25V21.25H7.5V25H22.5V21.25H25V25C25 25.6875 24.7554 26.2763 24.2663 26.7663C23.7771 27.2563 23.1883 27.5008 22.5 27.5H7.5ZM5 13.75V5C5 4.3125 5.245 3.72417 5.735 3.235C6.225 2.74583 6.81333 2.50083 7.5 2.5H17.5L25 10V13.75H22.5V11.25H16.25V5H7.5V13.75H5ZM1.25 18.75V16.25H28.75V18.75H1.25Z"
        fill={props.fill || 'currentColor'}
      />
    </svg>
  );
};

export default IconQuiz;
