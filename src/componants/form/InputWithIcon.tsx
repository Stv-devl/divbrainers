import clsx from 'clsx';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { InputWithIconProps } from '@/types/type';

/**
 * Renders an input field with dynamic styling based on validation state.
 * The component supports displaying an icon, and changes the border and text color based on error presence.
 * An error message is displayed below the input field when validation fails.
 * @param {InputWithIconProps} props - The properties for the Input component.
 * @returns The rendered input component which may include an optional error message.
 */

const InputWithIcon: React.FC<InputWithIconProps> = ({
  name,
  type,
  label,
  placeholder,
  autoComplete,
  IconComponent,
  error,
  registration,
}: InputWithIconProps) => {
  const errorId = `error-${name}`;

  const inputClasses = twMerge(
    'input-theme size-full rounded-lg pl-9 sm:pl-10 ',
    clsx(error ? 'border-red-500 text-red-500' : 'text-neutral-500')
  );

  return (
    <>
      <label htmlFor={name} className="w-[150px]">
        {label}
      </label>
      <div className="h-[46px] relative w-full">
        {IconComponent && (
          <div className="absolute left-3 top-1/2 mt-0.5 size-max -translate-y-1/2">
            <IconComponent />
          </div>
        )}
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={inputClasses}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          {...registration}
        />
        {error && (
          <span
            id={errorId}
            className="text-red-500 font-light relative right-0 top-auto transform-none sm:absolute sm:right-3 sm:top-1/2 sm:-translate-y-1/2"
          >
            {error}
          </span>
        )}
      </div>
    </>
  );
};

export default InputWithIcon;
