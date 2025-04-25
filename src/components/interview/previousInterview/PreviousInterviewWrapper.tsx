import React from 'react';
import { jobInterviewsMock } from '@/constante/jobInterviewMock';
import FormerInterviewCard from './PreviousInterviewCard';

/**
 * Component that displays a list of previous job interviews
 * @returns {JSX.Element} A component that renders a title and a list of FormerInterviewCard components
 */
const PreviousInterviewWrapper = () => {
  return (
    <>
      <h1 className="text-lg sm:text-xl font-bold text-blue-800 mb-2">
        Your previous job interviews :
      </h1>
      <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-5 sm:mb-10 w-full">
        {jobInterviewsMock &&
          jobInterviewsMock.map((interview) => (
            <div key={interview.id}>
              <FormerInterviewCard interview={interview} />
            </div>
          ))}
      </div>
    </>
  );
};

export default PreviousInterviewWrapper;
