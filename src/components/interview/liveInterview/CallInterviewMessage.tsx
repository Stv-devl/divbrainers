import Image from 'next/image';
import React from 'react';

const CallInterviewMessage = () => {
  return (
    <div className="w-[90%] sm:w-[95%] lg:w-[90%] xl:w-[60%] mx-auto">
      <div className="relative mt-5 sm:mt-10 w-full h-full bg-white shadow-sm border border-gray-300 rounded-lg">
        <div className="flex items-center gap-4 p-5 w-full h-[85px] bg-gray-100 rounded-t-lg">
          <Image
            src="/images/recruiter.png"
            alt="recruiter"
            width={60}
            height={60}
            className="ml-0 sm:ml-5 w-[60px] h-[60px] object-cover rounded-full border-2 border-blue-800"
          />
          <h3 className="text-lg font-bold">Julia Divana ask :</h3>
        </div>
        <div className="flex justify-center items-center h-full p-2 sm:p-5">
          <p className="px-2 sm:px-5">
            What happens if you call a useState setter function multiple times
            in a row using the current state value directly, and how can you
            ensure each update is based on the latest state?
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-2 h-full bg-blue-500 rounded-l-lg"></div>
      </div>
    </div>
  );
};

export default CallInterviewMessage;
