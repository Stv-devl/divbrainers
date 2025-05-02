'use client';

import React, { useMemo, useState } from 'react';
import { InputSelectStackProps } from '@/types/type';

const InputSelectStack: React.FC<InputSelectStackProps> = ({
  label,
  options,
  value,
  onChange,
  stackError,
  setStackError,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredValues = useMemo(() => {
    return Object.fromEntries(
      Object.entries(options).filter(
        ([_, label]) =>
          !value.includes(label) &&
          label.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  }, [inputValue, value, options]);

  const addValue = (label: string) => {
    if (value.includes(label)) return;
    onChange(label);
    setInputValue('');
    setIsOpen(false);
    setStackError('');
  };

  return (
    <div className="relative">
      {label && <label className="font-semibold text-gray-700">{label}</label>}

      <input
        type="text"
        value={inputValue}
        placeholder="Add a stack"
        onChange={(e) => {
          setInputValue(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 100)}
        className={`w-full mb-1  border ${
          stackError ? 'border-red-500' : 'border-gray-300'
        } rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500`}
        data-testid="input-select-stack"
      />
      {stackError && (
        <span className="text-red-500 text-sm sm:text-base ">{stackError}</span>
      )}

      {isOpen && Object.values(filteredValues).length > 0 && (
        <ul className="absolute z-10 w-full bg-white shadow-sm border-blue-100 border rounded-md mt-1 max-h-40 overflow-auto">
          {Object.entries(filteredValues).map(([key, label]) => (
            <li key={key}>
              <button
                type="button"
                className="size-full text-left px-4 py-2 hover:bg-blue-100 cursor-pointer"
                onMouseDown={() => addValue(label)}
                data-testid={`option-${label}`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InputSelectStack;
