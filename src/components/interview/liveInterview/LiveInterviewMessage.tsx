import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import { DisplayedMessage } from '@/types/type';
import { cn } from '../../../../lib/utils/cn';

interface Props {
  messages: DisplayedMessage[];
}

/**
 * Component that displays interview messages from the recruiter
 * @param {Object} props - Component props
 * @param {DisplayedMessage[]} props.messages - Array of messages to display
 * @returns {JSX.Element} The CallInterviewMessage component
 */
const CallInterviewMessage = ({ messages }: Props) => {
  const recruiterMessages = messages.filter((msg) => msg.role === 'assistant');
  const visibleMessages = recruiterMessages.slice(-2);
  return (
    <div className="w-[90%] sm:w-[95%] lg:w-[90%] xl:w-[75%] mx-auto">
      <div className="relative mt-5 sm:mt-10 w-full bg-white shadow-sm border border-gray-300 rounded-lg">
        <div className="flex items-center gap-4 p-5 h-[85px] bg-gray-100 rounded-t-lg">
          <Image
            src="/images/recruiter.png"
            alt="recruiter"
            width={60}
            height={60}
            className="ml-0 ssm:ml-5 w-[60px] h-[60px] object-cover rounded-full border-2 border-blue-800"
          />
          <h3 className="text-lg font-bold">Julia Divana ask :</h3>
        </div>
        <div className="flex flex-col w-full gap-2 px-4 py-5 sm:px-6 sm:py-6">
          <AnimatePresence mode="popLayout">
            {visibleMessages.map((msg, index) => {
              const isCurrent = index === visibleMessages.length - 1;

              return (
                <motion.div
                  key={msg.messageId}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={cn(
                    'flex px-3 py-2 rounded-md font-medium border border-blue-200 shadow-sm',
                    isCurrent ? 'bg-blue-50 text-blue-900' : 'text-gray-800'
                  )}
                >
                  {msg.content}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="absolute bottom-0 left-0 w-2 h-full bg-blue-500 rounded-l-lg" />
      </div>
    </div>
  );
};

export default CallInterviewMessage;
