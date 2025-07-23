import React from 'react';
import { getInterview } from '../../../../lib/serveur/getInterview';
import SetInterviewCard from './SetInterviewCard';
import SetInterviewCardTitle from './SetInterviewCardTitle';

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
          <SetInterviewCardTitle />
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
