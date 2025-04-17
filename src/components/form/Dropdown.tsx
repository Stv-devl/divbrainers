import React, { useState } from 'react';
import { iconsMap } from '@/constante/iconsMap';
import { DropdownProps } from '@/types/type';

/**
 * Dropdown component for selecting an option from a list
 * @param {DropdownProps} props - Component props
 * @param {string} [props.label] - Optional label for the dropdown
 * @param {DropdownOption[]} props.options - Available options for the dropdown
 * @param {string} props.value - Currently selected value
 * @param {Function} props.onChange - Callback function when selection changes
 * @returns {JSX.Element} A dropdown component
 */
const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || 'Select';

  return (
    <div className="relative inline-block text-left">
      {label && <span className="font-semibold">{label}</span>}
      <div>
        <button
          type="button"
          className="dropdown-theme inline-flex justify-between items-center w-full rounded-md h-[40px] shadow-sm"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedLabel}
          <iconsMap.IconChevronDown className="size-5" />
        </button>
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-md border border-blue-100 bg-white shadow-md">
          <ul className="py-0.5">
            {options.map((option) => (
              <li key={option.value}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-blue-100 cursor-pointer"
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
