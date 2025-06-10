import React from 'react';
import { cn } from '../../../lib/utils/cn';

interface LoadingProps {
  isLoggedIn?: boolean;
  value?: string;
}

/**
 * The component is a loader who is active when we waiting for'data'
 * @returns {JSX.Element} A rotating loading circle.
 */
const Loading = ({ value, isLoggedIn }: LoadingProps) => {
  return (
    <div
      data-testid="loading"
      className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
    >
      <div
        className={cn(
          'flex flex-col items-center',
          isLoggedIn && 'translate-x-0 sm:translate-x-[65px] lg:translate-x-0'
        )}
      >
        <span className="size-[60px] animate-[spin_2s_linear_infinite] rounded-full border-[10px] border-blue-500 border-t-gray-200"></span>
        {value && (
          <p className="mt-2 text-center text-blue-500 font-semibold">
            {value}
          </p>
        )}
      </div>
    </div>
  );
};

export default Loading;
