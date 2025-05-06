'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '@/components/ui/buttons/Button';
import { iconStackMapping } from '@/constante/iconStackMap';
import { dropdowns } from '@/constante/interviewFormData';
import useInterviewStore from '@/store/useStoreInterview';
import { createInterview } from '../../../../lib/actions/interviews/createInterview';
import {
  interviewSchema,
  InterviewSchemaType,
} from '../../../../lib/schema/interviewShema';
import { stackShema } from '../../../../lib/schema/stackShema';
import { iconsMap } from '../../../constante/iconsMap';
import { dropdownController } from '../../ui/form/dropdown/DropdownController';
import InputSelectStack from '../../ui/form/input/InputSelectStack';

interface SetInterviewFormProps {
  setIsLoading: (value: boolean) => void;
}

/**
 * Form component for setting up an interview
 * @returns {JSX.Element} A form with dropdown selections and stack choices
 */
const SetInterviewForm = ({ setIsLoading }: SetInterviewFormProps) => {
  const { stack, addToStack } = useInterviewStore();
  const [stackError, setStackError] = React.useState('');

  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InterviewSchemaType>({
    resolver: zodResolver(interviewSchema),
    defaultValues: {
      position: 'frontend',
      difficulty: 'junior',
      interviewType: 'technical',
      numberOfQuestions: '5',
    },
  });

  /**
   * Handles form submission
   * @param {InterviewSchemaType} data - Form data from react-hook-form
   */
  const onSubmit = async (data: InterviewSchemaType) => {
    const result = stackShema.safeParse({ stack });
    if (!result.success) {
      const errorMessage =
        result.error.errors[0]?.message || 'Invalid stack selection.';
      setStackError(errorMessage);
      console.log('Stack validation failed:', errorMessage);
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.set('position', data.position);
    formData.set('difficulty', data.difficulty);
    formData.set('interviewType', data.interviewType);
    formData.set('numberOfQuestions', data.numberOfQuestions);
    formData.set('stack', JSON.stringify(stack));

    try {
      const newInterview = await createInterview(formData);
      router.push(`/interview/live/${newInterview.id}`);
    } catch (error) {
      console.error('Update failed:', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col items-center lg:items-end gap-5 sm:gap-10"
    >
      <div className="flex flex-col gap-5 bg-white rounded-lg p-6 border border-gray-200 size-full max-w-[450px] h-full shadow-sm">
        {dropdowns.map(({ name, label, options }) =>
          dropdownController({ name, label, options, control })
        )}
        <InputSelectStack
          label="Add your stack"
          options={iconStackMapping}
          value={stack}
          onChange={addToStack}
          stackError={stackError}
          setStackError={setStackError}
        />
      </div>

      <div className="flex justify-center items-center w-full max-w-[200px] h-[46px]">
        <Button
          label="Start Interview"
          color="filled"
          type="submit"
          IconComponent={iconsMap.IconStart}
          disabled={isSubmitting}
          isLoading={isSubmitting}
        />
      </div>
    </form>
  );
};

export default SetInterviewForm;
