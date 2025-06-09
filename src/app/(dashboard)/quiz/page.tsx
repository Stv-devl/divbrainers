import React from 'react';
import QuizForm from '@/components/quiz/setQuiz/QuizForm';
import TechnicalStackWrapper from '@/components/wrappers/TechnicalStackWrapper';

const Page = () => {
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="space-y-4 sm:space-y-7 w-full sm:w-[400px]">
          <h1 className="sm:mt-2 text-xl sm:text-2xl text-left sm:text-center text-blue-800 font-bold ">
            Select your quiz
          </h1>
          <QuizForm />
        </div>
      </div>
      <div className="flex lg:items-center lg:justify-center -ml-4 sm:ml-0 mt-1 sm:mt-4 w-full">
        <TechnicalStackWrapper isCanRemove={true} />
      </div>
    </>
  );
};

export default Page;
