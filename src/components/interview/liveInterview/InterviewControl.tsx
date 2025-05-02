import { useRouter } from 'next/navigation';
import React from 'react';
import Button from '@/components/buttons/Button';
import TechnicalStack from '@/components/technicalStack/TechnicalStack';
import { iconsMap } from '@/constante/iconsMap';
import { CallStatus } from '@/hooks/manage/useManageAgent';

/**
 * Component that displays interview control buttons and technical stack
 * @param {Object} props - Component props
 * @param {string} props.callStatus - Current status of the call
 * @param {Function} props.handleCall - Function to handle starting a call
 * @param {Function} props.handleDisconnect - Function to handle disconnecting a call
 * @returns {JSX.Element} A component with technical stack display and control buttons (Break and End)
 */

interface InterviewControlProps {
  callStatus: CallStatus;
  handleCall: () => void;
  handleDisconnect: () => void;
}

const InterviewControl = ({
  callStatus,
  handleCall,
  handleDisconnect,
}: InterviewControlProps) => {
  const router = useRouter();
  const isStartDisabled = callStatus !== CallStatus.INACTIVE;
  const isStartLoading = callStatus === CallStatus.CONNECTING;

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center w-[98%] sm:w-[95%] lg:w-[90%] xl:w-[75%] mx-auto my-5 sm:my-10">
      <TechnicalStack />
      <div className="flex justify-end sm:justify-center gap-2 mt-5 sm:mt-0">
        <div className="w-32 h-8">
          <Button
            label="Start"
            color="filled"
            IconComponent={iconsMap.IconStart}
            onClick={handleCall}
            disabled={isStartDisabled}
            isLoading={isStartLoading}
          />
        </div>
        {/*
        <div className="w-32 h-8">
          <Button
            label="Break"
            color="filled"
            IconComponent={iconsMap.IconBreak}
            disabled={callStatus !== 'ACTIVE'}
          />
        </div>*/}
        <div className="w-32 h-8">
          <Button
            label="End"
            color="filled"
            bgColor="bg-red-500"
            hoverColor="hover:bg-red-800"
            IconComponent={iconsMap.IconStop}
            onClick={() => {
              handleDisconnect();
              router.push('/interview');
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default InterviewControl;
