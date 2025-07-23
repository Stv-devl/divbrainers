'use client';

import React from 'react';
import { inputFields } from '@/constante/constante';
import { useClientTranslation } from '@/hooks/i18n/useClientTranslation';
import { InputFieldProps, ProfileWrapperProps } from '@/types/type';
import Input from '../ui/form/input/Input';

/**
 * ProfileWrapper : input fields for username, email.
 */
const ProfileWrapper: React.FC<ProfileWrapperProps> = ({
  register,
  errors,
}) => {
  const { t, isClient } = useClientTranslation();

  if (!isClient) return null;

  return (
    <div className="bg-gray-50 flex flex-col gap-6 rounded-lg p-7 lg:w-3/4 lg:max-w-[950px]">
      {inputFields.map((field: InputFieldProps) => {
        const name = field.name;
        return (
          <div
            key={name}
            className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2 lg:gap-10"
          >
            <Input
              name={name}
              label={t(`profile.fields.${name}.label`)}
              placeholder={t(`profile.fields.${name}.placeholder`)}
              type="text"
              error={errors[name as keyof typeof errors]?.message || ''}
              autoComplete={field.autoComplete}
              register={register}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ProfileWrapper;
