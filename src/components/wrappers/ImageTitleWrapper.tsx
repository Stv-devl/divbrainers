import Image from 'next/image';
import React from 'react';

/**
 * Component that displays a recruiter image with a speech bubble
 * @returns {JSX.Element} A component with recruiter image and welcome message
 */
const ImageTitleWrapper = () => {
  return (
    <div className="flex h-full items-center lg:mt-10">
      <div className="flex relative size-[200px] sm:size-[230px] lg:w-[500px] lg:h-[300px] ">
        <Image
          src="/images/recruiter.png"
          alt="your recruiter asking questions"
          width={230}
          height={230}
          className="border-3 border-blue-500 object-cover w-[200px] h-[200px] sm:w-[230px] sm:h-[230px] rounded-full absolute"
          priority
        />
        <Image
          src="/images/speech-bubble.png"
          alt="bubble for write questions"
          width={290}
          height={246}
          className="hidden lg:block absolute left-[200px] top-[-120px] object-cover z-80"
          priority
        />
        <h1 className="hidden lg:block absolute left-[240px] -top-[40px] w-[240px] text-2xl font-bold z-99">
          Welcome! Take a seat and get ready.
        </h1>
      </div>
    </div>
  );
};

export default ImageTitleWrapper;
