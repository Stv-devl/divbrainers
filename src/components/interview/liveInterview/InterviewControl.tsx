import React from 'react';
import Button from '@/components/buttons/Button';
import TechnicalStack from '@/components/technicalStack/TechnicalStack';
import { iconsMap } from '@/constante/iconsMap';

/**
 * Component that displays interview control buttons and technical stack
 * @returns {JSX.Element} A component with technical stack display and control buttons (Break and End)
 */
const InterviewControl = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center w-[98%] sm:w-[95%] lg:w-[90%] xl:w-[75%] mx-auto my-5 sm:my-10">
      <TechnicalStack />
      <div className="flex justify-end sm:justify-center gap-2 mt-5 sm:mt-0">
        <div className="w-32 h-8">
          <Button
            label="Break"
            color="filled"
            IconComponent={iconsMap.IconBreak}
          />
        </div>
        <div className="w-32 h-8">
          <Button
            label="End"
            color="filled"
            bgColor="bg-red-500"
            hoverColor="hover:bg-red-800"
            IconComponent={iconsMap.IconStart}
          />
        </div>
      </div>
    </div>
  );
};

export default InterviewControl;
