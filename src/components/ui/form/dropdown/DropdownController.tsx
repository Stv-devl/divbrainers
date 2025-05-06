import React from 'react';
import { Controller } from 'react-hook-form';
import { DropdownControllerParams } from '@/types/type';
import Dropdown from './Dropdown';

/**
 * Creates a controlled dropdown component for React Hook Form
 * @param {keyof InterviewSchemaType} name - Field name in the form
 * @param {string} label - Label for the dropdown
 * @param {DropdownOption[]} options - Available options for the dropdown
 * @param {Control<InterviewSchemaType>} control - Form control from React Hook Form
 * @returns {JSX.Element} Controlled dropdown component
 */
export const dropdownController = ({
  name,
  label,
  options,
  control,
}: DropdownControllerParams) => (
  <Controller
    key={name}
    control={control}
    name={name}
    render={({ field }) => (
      <Dropdown
        label={label}
        options={options}
        value={field.value}
        onChange={field.onChange}
      />
    )}
  />
);
