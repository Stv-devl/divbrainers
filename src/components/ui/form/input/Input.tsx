import React from 'react';
import { CustomsInputProps } from '@/types/type';
import { cn } from '../../../../../lib/utils/cn';

/**
 * Renders an input field with dynamic styling based on validation state.
 * The component supports displaying an icon, and changes the border and text color based on error presence.
 * An error message is displayed below the input field when validation fails.
 * @param {CustomsInputProps} props - The properties for the Input component.
 * @returns The rendered input component which may include an optional error message.
 */
const Input: React.FC<CustomsInputProps> = ({
  name,
  type,
  label,
  placeholder,
  error,
  autoComplete,
  register,
}: CustomsInputProps) => {
  const errorId = `error-${name}`;

  const inputClasses = cn(
    'input-theme size-full rounded-lg pl-2 lg:pl-4 text-sm lg:text-base',
    error ? 'border-red-500 text-red-500' : 'text-neutral-500'
  );

  const labelClasses = cn(
    error && label !== 'Link' ? 'text-error-red' : 'text-darkest-gray',
    'text-sm w-[100px]'
  );

  const field = register(name);

  return (
    <>
      <label htmlFor={name} className={labelClasses}>
        {label}
      </label>
      <div className={'h-[46px] relative w-full'}>
        <input
          className={inputClasses}
          type={type}
          id={name}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          {...field}
        />
        {error && (
          <span
            id={errorId}
            className="text-sm lg:text-base text-red-500 relative right-0 top-auto transform-none lg:absolute lg:right-3 lg:top-1/2 lg:-translate-y-1/2"
          >
            {error}
          </span>
        )}
      </div>
    </>
  );
};

export default Input;
