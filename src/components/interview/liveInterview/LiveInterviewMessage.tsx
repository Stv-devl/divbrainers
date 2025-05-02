import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

/**
 * Component that displays the message from the recruiter during a live interview
 * @param {Object} props - Component props
 * @param {string} props.lastMessage - The last message from the recruiter
 * @returns {JSX.Element} A component showing the recruiter's question in a styled message box
 */
const CallInterviewMessage = ({ lastMessage }: { lastMessage: string }) => {
/* const [typedMessage, setTypedMessage] = useState('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!lastMessage) return;
    setTypedMessage('');
    let index = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      index++;
      setTypedMessage(lastMessage.slice(0, index));

      if (index >= lastMessage.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, 25);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [lastMessage]);*/

  return (
    <div className="w-[90%] sm:w-[95%] lg:w-[90%] xl:w-[75%] mx-auto">
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
          <p className="px-2 sm:px-5 font-medium text-gray-800">
            {lastMessage}
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-2 h-full bg-blue-500 rounded-l-lg"></div>
      </div>
    </div>
  );
};

export default CallInterviewMessage;
