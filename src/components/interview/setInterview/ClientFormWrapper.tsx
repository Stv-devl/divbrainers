'use client';

import React, { useState } from 'react';
import Loading from '@/components/loading/Loading';
import ImageTitleWrapper from '@/components/wrappers/ImageTitleWrapper';
import SetInterviewForm from './SetInterviewForm';

const ClientFormWrapper = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <h1 className="block lg:hidden text-blue-800 text-center text-xl font-bold mt-0 sm:mt-5">
        Welcome! Take a seat and get ready
      </h1>
      {isLoading && (
        <Loading value="Generating questions..." isLoggedIn={true} />
      )}
      <div className="relative flex flex-col lg:flex-row items-center lg:justify-between gap-5 sm:gap-10 mt-0 lg:mt-10 mx-[5%] xl:mx-[10%] ">
        <ImageTitleWrapper />
        <SetInterviewForm setIsLoading={setIsLoading} />
      </div>
    </>
  );
};

export default ClientFormWrapper;
