'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Loading from '@/components/loading/Loading';
import Button from '@/components/ui/buttons/Button';
import { dropdownController } from '@/components/ui/form/dropdown/DropdownController';
import InputSelectStack from '@/components/ui/form/input/InputSelectStack';
import { iconStackMapping } from '@/constante/iconStackMap';
import { optionsDifficulty } from '@/constante/interviewFormData';
import useInterviewStore from '@/store/useStoreInterview';
import { createQuiz } from '../../../../lib/actions/quiz/createQuiz';
import {
  quizFormSchema,
  QuizFormSchemaType,
} from '../../../../lib/schema/quizFormShema';
import { stackShema } from '../../../../lib/schema/stackShema';

/**
 * Form component for creating and starting a quiz
 * @component
 * @returns {JSX.Element} The rendered quiz form
 */
const QuizForm = () => {
  const { stack, addToStack } = useInterviewStore();
  const [stackError, setStackError] = useState('');
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<QuizFormSchemaType>({
    resolver: zodResolver(quizFormSchema),
    defaultValues: {
      difficulty: 'junior',
    },
  });

  /**
   * Handles form submission, validates stack selection, and creates the quiz
   * @param {QuizFormSchemaType} data - Form data containing difficulty level
   */
  const onSubmit = async (data: QuizFormSchemaType) => {
    setStackError('');
    setServerError('');

    const result = stackShema.safeParse({ stack });

    if (!result.success) {
      const message =
        result.error.errors[0]?.message || 'Please select at least one stack.';
      setStackError(message);
      return;
    }

    try {
      setLoading(true);

      const response = await createQuiz(data.difficulty, stack);

      if (!response.success) {
        setServerError(response.message || 'Server error occurred');
        setLoading(false);
        return;
      }

      router.push('/quiz/live');
    } catch (err) {
      console.error(err);
      setServerError('Unexpected error while creating quiz');
      setLoading(false);
    }
  };

  return (
    <>
      <form
        className="bg-white p-7 rounded-sm shadow-sm w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-5">
          <InputSelectStack
            label="Add your stack"
            options={iconStackMapping}
            value={stack}
            onChange={addToStack}
            stackError={stackError}
            setStackError={setStackError}
          />

          {dropdownController({
            name: 'difficulty',
            label: 'Select Difficulty',
            options: optionsDifficulty,
            control,
          })}

          {serverError && (
            <p className="text-red-500 text-sm text-center">{serverError}</p>
          )}

          <div className="w-44 h-10 mx-auto">
            <Button
              label="Start Interview"
              color="filled"
              type="submit"
              disabled={isSubmitting}
              isLoading={isSubmitting}
            />
          </div>
        </div>
      </form>

      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/30 backdrop-blur-[1px]">
          <Loading value="Creating quiz..." />
        </div>
      )}
    </>
  );
};

export default QuizForm;
