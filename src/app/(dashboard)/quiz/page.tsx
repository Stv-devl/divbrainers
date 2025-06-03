import React from 'react';
import QuizForm from '@/components/quiz/setQuiz/QuizForm';
import TechnicalStackWrapper from '@/components/wrappers/TechnicalStackWrapper';

const Page = () => {
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="flex flex-col gap-5 w-[400px]">
          <h1 className="text-xl sm:text-2xl text-left sm:text-center text-blue-800 font-bold ">
            Select your quiz
          </h1>
          <QuizForm />
        </div>
      </div>
      <div className="mt-5">
        <TechnicalStackWrapper />
      </div>
    </>
  );
};

export default Page;
