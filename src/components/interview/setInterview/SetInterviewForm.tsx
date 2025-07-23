'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { TFunction } from 'i18next';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '@/components/ui/buttons/Button';
import { dropdownController } from '@/components/ui/form/dropdown/DropdownController';
import InputSelectStack from '@/components/ui/form/input/InputSelectStack';
import { iconStackMapping } from '@/constante/iconStackMap';
import { getDropdowns } from '@/constante/interviewFormData';
import { useClientTranslation } from '@/hooks/i18n/useClientTranslation';
import useInterviewStore from '@/store/useStoreInterview';
import { createInterview } from '../../../../lib/actions/interviews/createInterview';
import {
  interviewSchema,
  InterviewSchemaType,
} from '../../../../lib/schema/interviewShema';
import { getStackShema } from '../../../../lib/schema/stackShema';
import { iconsMap } from '../../../constante/iconsMap';

interface SetInterviewFormProps {
  setIsLoading: (value: boolean) => void;
}

const SetInterviewForm = ({ setIsLoading }: SetInterviewFormProps) => {
  const { t, isClient } = useClientTranslation();
  const { stack, addToStack } = useInterviewStore();
  const [stackError, setStackError] = React.useState('');
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InterviewSchemaType>({
    resolver: zodResolver(interviewSchema(t as TFunction)),
    defaultValues: {
      position: 'front-end',
      difficulty: 'junior',
      interviewType: 'technical',
      numberOfQuestions: '5',
    },
  });

  const dropdowns = getDropdowns(t as TFunction);

  const onSubmit = async (data: InterviewSchemaType) => {
    const result = getStackShema(t as TFunction).safeParse({ stack });
    if (!result.success) {
      const errorMessage =
        result.error.errors[0]?.message || t('interview.form.errors.default');
      setStackError(errorMessage);
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
      console.error('Interview creation failed:', error);
      setIsLoading(false);
    }
  };

  if (!isClient) return null;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col items-center lg:items-end gap-5 sm:gap-10"
    >
      <div className="flex flex-col gap-5 bg-white rounded-lg p-6 border border-gray-200 size-full max-w-[450px] h-full shadow-sm">
        {dropdowns.map(({ name, label, options, placeholder }) =>
          dropdownController({
            name,
            label: t(label),
            options: options.map((opt) => ({ ...opt, label: t(opt.label) })),
            placeholder: t(placeholder),
            control,
          })
        )}
        <InputSelectStack
          label={t('interview.form.fields.stack.label')}
          options={iconStackMapping}
          value={stack}
          onChange={addToStack}
          stackError={stackError}
          setStackError={setStackError}
          t={t as TFunction}
        />
      </div>

      <div className="flex justify-center items-center w-full max-w-[200px] h-[46px]">
        <Button
          label={t('interview.form.button')}
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
