import { clsx, ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class values using clsx and tailwind-merge
 * @param inputs - Class values to be combined
 * @returns Combined and merged class string
 */
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(...inputs));
};
