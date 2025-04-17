'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@/components/buttons/Button';
import { optionsAddYourStack, dropdowns } from '@/constante/interviewFormData';
import { interviewSchema, InterviewSchemaType } from '@/schema/interviewShema';
import { iconsMap } from '../../../constante/iconsMap';
import { dropdownController } from '../../form/DropdownController';
import InputStackChoice from '../../form/InputStackChoice';

/**
 * Form component for setting up an interview
 * @returns {JSX.Element} A form with dropdown selections and stack choices
 */
const SetInterviewForm = () => {
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
  const [selectedStacks, setSelectedStacks] = useState<string[]>([]);

  /**
   * Handles form submission
   * @param {InterviewSchemaType} data - Form data from react-hook-form
   */
  const onSubmit = (data: InterviewSchemaType) => {
    const payload = {
      ...data,
      stack: selectedStacks,
    };

    console.log('send data to api :', payload);
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
        <InputStackChoice
          label="Add your stack"
          options={optionsAddYourStack}
          value={selectedStacks}
          onChange={setSelectedStacks}
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
