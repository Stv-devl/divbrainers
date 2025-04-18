import React from 'react';
import { inputFields } from '@/constante/constante';
import { InputFieldProps, ProfileWrapperProps } from '@/types/type';
import Input from '../form/input/Input';

/**
 * ProfileWrapper : input fields for username, email.
 */
const ProfileWrapper: React.FC<ProfileWrapperProps> = ({
  register,
  errors,
}) => {
  return (
    <div className="bg-gray-50 flex flex-col gap-6 rounded-lg p-7 lg:w-3/4">
      {inputFields.map((field: InputFieldProps) => (
        <div
          key={field.name}
          className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2 lg:gap-10"
        >
          <Input
            name={field.name}
            label={field.label}
            placeholder={field.placeholder}
            type="text"
            error={errors[field.name as keyof typeof errors]?.message || ''}
            autoComplete={field.autoComplete}
            register={register}
          />
        </div>
      ))}
    </div>
  );
};

export default ProfileWrapper;
