import React from 'react';
import { getInterview } from '../../../../lib/actions/interviews/getInterview';
import SetInterviewCard from './SetInterviewCard';

/**
 * Component that displays a list of previous job interviews
 * @returns {JSX.Element} A component that renders a title and a list of PreviousInterviewCard components
 */
const SetInterviewCardWrapper = async () => {
  const interviews = await getInterview();

  if (!interviews) {
    return null;
  }

  return (
    <>
      {interviews.length > 0 && (
        <>
          <h1 className="text-lg sm:text-xl font-bold text-blue-800 mb-2">
            Your previous job interviews :
          </h1>
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-5 sm:mb-10 w-full">
            {interviews.map((interview) => (
              <div key={interview.id}>
                <SetInterviewCard interview={interview} />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default SetInterviewCardWrapper;
