'use client';

import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react';
import Button from '@/components/buttons/Button';
import { deleteInterview } from '../../../../lib/actions/interviews/deleteInterview';

type SetInterviewCardControlProps = {
  interviewId: string;
};

const SetInterviewCardControl = ({
  interviewId,
}: SetInterviewCardControlProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isDeletePending, startDeleteTransition] = useTransition();

  const handleStart = () => {
    startTransition(() => {
      router.push(`/interview/live/${interviewId}`);
    });
  };

  const handleDelete = () => {
    startDeleteTransition(async () => {
      await deleteInterview({ interviewId });
      router.refresh();
    });
  };
  return (
    <form className="flex justify-between w-full">
      <input type="hidden" name="interviewId" value={interviewId} />
      <div className="w-20 h-6">
        <Button
          type="submit"
          label="Delete"
          color="filled"
          bgColor="bg-red-500"
          fontSize="text-sm"
          hoverColor="hover:bg-red-800"
          onClick={handleDelete}
          isLoading={isDeletePending}
          disabled={isDeletePending || isPending}
        />
      </div>

      <div className="w-20 h-6">
        <Button
          label="Start"
          color="filled"
          fontSize="text-sm"
          onClick={handleStart}
          isLoading={isPending}
          disabled={isPending || isDeletePending}
        />
      </div>
    </form>
  );
};

export default SetInterviewCardControl;
