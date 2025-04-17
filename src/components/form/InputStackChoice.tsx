'use client';

import React, { useMemo, useState } from 'react';
import { InputSelectStackProps } from '@/types/type';

/**
 * InputSelectStack component for selecting multiple options from a dropdown
 * @param {Object} props - Component props
 * @param {string} [props.label] - Optional label for the input
 * @param {Array<{label: string, value: string}>} props.options - Available options to select from
 * @param {string[]} props.value - Currently selected values
 * @param {Function} props.onChange - Callback function when selection changes
 * @param {boolean} [props.error] - Whether there is an error with the input
 * @returns {JSX.Element} A multi-select input component
 */
const InputSelectStack: React.FC<InputSelectStackProps> = ({
  label,
  options,
  value,
  onChange,
  error,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions = useMemo(() => {
    return options.filter(
      (opt) =>
        opt.label.toLowerCase().includes(inputValue.toLowerCase()) &&
        !value.includes(opt.label)
    );
  }, [inputValue, options, value]);

  const addValue = (label: string) => {
    if (value.includes(label)) return;
    onChange([...value, label]);
    setInputValue('');
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {label && <label className="font-semibold text-gray-700">{label}</label>}

      <input
        type="text"
        value={inputValue}
        placeholder="Add a stack"
        onChange={(e) => {
          setInputValue(e.target.value.trim());
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 100)}
        className={`w-full mt-2 border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500`}
        data-testid="input-select-stack"
      />

      {isOpen && filteredOptions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white shadow-sm border-blue-100 border rounded-md mt-1 max-h-40 overflow-auto">
          {filteredOptions.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                className="w-full text-left px-4 py-2 hover:bg-blue-100 cursor-pointer"
                onClick={() => addValue(option.label)}
                data-testid={`option-${option.label}`}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InputSelectStack;
