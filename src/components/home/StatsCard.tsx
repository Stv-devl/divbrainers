'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { useClientTranslation } from '@/hooks/i18n/useClientTranslation';

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

/**
 * StatsCard component for displaying statistics
 * @param title - The title of the statistic
 * @param value - The main value to display
 * @param description - Optional description text
 * @param icon - Optional icon component
 * @param trend - Optional trend data with value and direction
 * @param className - Additional CSS classes
 * @returns {JSX.Element} The StatsCard component
 */
const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className = '',
}) => {
  const { t, isClient } = useClientTranslation();

  if (!isClient) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        {Icon && (
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <Icon className="w-4 h-4 text-blue-600" />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="text-3xl font-bold text-blue-800">{value}</div>
        {description && <p className="text-sm text-gray-600">{description}</p>}
        {trend && (
          <div className="flex items-center space-x-1">
            <span
              className={`text-sm font-medium ${
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {trend.isPositive ? '+' : ''}
              {trend.value}%
            </span>
            <span className="text-xs text-gray-500">
              {t('overview.stats.vsLastMonth', 'vs last month')}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default StatsCard;
