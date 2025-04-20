'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '@/components/buttons/Button';
import { iconStackMapping } from '@/constante/iconStackMap';
import { dropdowns } from '@/constante/interviewFormData';
import useInterviewStore from '@/store/useStoreInterview';
import {
  interviewSchema,
  InterviewSchemaType,
} from '../../../../lib/schema/interviewShema';
import { iconsMap } from '../../../constante/iconsMap';
import { dropdownController } from '../../form/dropdown/DropdownController';
import InputSelectStack from '../../form/input/InputSelectStack';

/**
 * Form component for setting up an interview
 * @returns {JSX.Element} A form with dropdown selections and stack choices
 */
const SetInterviewForm = () => {
  const { stack, addToStack } = useInterviewStore();
  const [stackError, setStackError] = React.useState('');

  const {
    control,
    handleSubmit,
    formState: { errors },
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
  const onSubmit = (data: InterviewSchemaType) => {
    console.log('send');
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
        />
      </div>
    </form>
  );
};

export default SetInterviewForm;
