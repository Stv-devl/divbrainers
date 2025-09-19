'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface ProgressData {
  label: string;
  value: number;
  max: number;
  color: 'blue' | 'green' | 'yellow' | 'red';
}

interface ProgressCardProps {
  title: string;
  description: string;
  progressData: ProgressData[];
  className?: string;
}

/**
 * ProgressCard component for displaying progress metrics
 * @param title - The card title
 * @param description - The card description
 * @param progressData - Array of progress data items
 * @param className - Additional CSS classes
 * @returns {JSX.Element} The ProgressCard component
 */
const ProgressCard: React.FC<ProgressCardProps> = ({
  title,
  description,
  progressData,
  className = '',
}) => {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-500';
      case 'green':
        return 'bg-green-500';
      case 'yellow':
        return 'bg-yellow-500';
      case 'red':
        return 'bg-red-500';
      default:
        return 'bg-blue-500';
    }
  };

  const getBackgroundColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-100';
      case 'green':
        return 'bg-green-100';
      case 'yellow':
        return 'bg-yellow-100';
      case 'red':
        return 'bg-red-100';
      default:
        return 'bg-blue-100';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-white rounded-lg border border-gray-200 shadow-sm h-full flex flex-col ${className}`}
    >
      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-blue-800">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>

        <div className="space-y-4 flex-1">
          {progressData.map((item, index) => {
            const percentage = (item.value / item.max) * 100;

            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">
                    {item.label}
                  </span>
                  <span className="text-sm font-semibold text-blue-800">
                    {item.value}/{item.max}
                  </span>
                </div>

                <div
                  className={`w-full rounded-full h-2 ${getBackgroundColorClasses(
                    item.color
                  )}`}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                    className={`h-2 rounded-full ${getColorClasses(
                      item.color
                    )}`}
                  />
                </div>

                <div className="text-right">
                  <span className="text-xs text-gray-500">
                    {percentage.toFixed(1)}%
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default ProgressCard;
