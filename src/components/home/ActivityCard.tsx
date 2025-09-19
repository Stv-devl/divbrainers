'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { iconsMap } from '@/constante/iconsMap';
import { useClientTranslation } from '@/hooks/i18n/useClientTranslation';

interface ActivityItem {
  id: string;
  title: string;
  type: 'interview' | 'quiz' | 'scan';
  score?: number;
  date: string;
  status: 'completed' | 'in_progress' | 'pending';
}

interface ActivityCardProps {
  title: string;
  description: string;
  activities: ActivityItem[];
  onViewAll?: () => void;
  className?: string;
}

/**
 * ActivityCard component for displaying recent user activities
 * @param title - The card title
 * @param description - The card description
 * @param activities - Array of activity items
 * @param onViewAll - Optional callback for view all action
 * @param className - Additional CSS classes
 * @returns {JSX.Element} The ActivityCard component
 */
const ActivityCard: React.FC<ActivityCardProps> = ({
  title,
  description,
  activities,
  onViewAll,
  className = '',
}) => {
  const { t, isClient } = useClientTranslation();

  if (!isClient) return null;
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'interview':
        return iconsMap.IconInterview;
      case 'quiz':
        return iconsMap.IconQuiz;
      case 'scan':
        return iconsMap.IconScan;
      default:
        return iconsMap.IconSats;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return t('overview.recentActivities.status.completed', 'Completed');
      case 'in_progress':
        return t('overview.recentActivities.status.inProgress', 'In Progress');
      case 'pending':
        return t('overview.recentActivities.status.pending', 'Pending');
      default:
        return t('overview.recentActivities.status.unknown', 'Unknown');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-white rounded-lg border border-gray-200 shadow-sm h-full flex flex-col ${className}`}
    >
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-blue-800">{title}</h3>
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          </div>
          {onViewAll && (
            <button
              onClick={onViewAll}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
            >
              {t('overview.recentActivities.viewAll', 'View all')}
            </button>
          )}
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        {activities.length > 0 ? (
          <div className="space-y-4 flex-1">
            {activities.map((activity) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 flex items-center justify-center">
                    {React.createElement(getTypeIcon(activity.type), {
                      className:
                        'w-6 h-6 text-blue-600 stroke-current fill-none',
                    })}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {activity.title}
                    </h4>
                    <p className="text-sm text-gray-500">{activity.date}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {activity.score && (
                    <span className="text-sm font-medium text-blue-600">
                      {activity.score}/100
                    </span>
                  )}
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      activity.status
                    )}`}
                  >
                    {getStatusText(activity.status)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 flex-1 flex flex-col justify-center">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <iconsMap.IconSats className="w-12 h-12 text-gray-400" />
            </div>
            <p className="text-gray-500">
              {t(
                'overview.recentActivities.noActivities',
                'No recent activities'
              )}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ActivityCard;
