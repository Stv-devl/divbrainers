'use client';

import React from 'react';
import Button from '@/components/buttons/Button';
import { deleteInterview } from '../../../../lib/actions/interviews/deleteInterview';

type SetInterviewCardControlProps = {
  interviewId: string;
};

const SetInterviewCardControl = ({
  interviewId,
}: SetInterviewCardControlProps) => {
  return (
    <form action={deleteInterview} className="flex justify-between w-full">
      <input type="hidden" name="interviewId" value={interviewId} />
      <div className="w-20 h-6">
        <Button
          type="submit"
          label="Delete"
          color="filled"
          bgColor="bg-red-500"
          fontSize="text-sm"
          hoverColor="hover:bg-red-800"
        />
      </div>

      <div className="w-20 h-6">
        <Button label="Start" color="filled" fontSize="text-sm" />
      </div>
    </form>
  );
};

export default SetInterviewCardControl;
