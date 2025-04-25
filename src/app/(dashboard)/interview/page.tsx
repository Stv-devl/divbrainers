import React from 'react';
import SetInterviewForm from '@/components/interview/setInterview/SetInterviewForm';
import PreviousInterviewWrapper from '@/components/interview/setInterview/SetInterviewWrapper';
import TechnicalStack from '@/components/technicalStack/TechnicalStack';
import ImageTitleWrapper from '@/components/wrappers/ImageTitleWrapper';

/**
 * Main page component for the interview section
 * Displays a welcome message, interview form, technical stack, and previous interviews
 * @returns {JSX.Element} The main page component
 */
const Page = () => {
  return (
    <>
      <h1 className="block lg:hidden text-center text-xl font-bold mt-5">
        Welcome! Take a seat and get ready
      </h1>
      <div className="relative flex flex-col lg:flex-row items-center lg:items-start lg:justify-between gap-5 sm:gap-10 mt-0 lg:mt-10 mx-[5%] xl:mx-[10%] ">
        <ImageTitleWrapper />
        <SetInterviewForm />
      </div>
      <TechnicalStack />
      <hr className="hidden sm:block border-t border-gray-300 mt-6 w-[95%] mx-auto" />
      <PreviousInterviewWrapper />
    </>
  );
};

export default Page;
