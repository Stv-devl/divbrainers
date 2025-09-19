'use client';

import { motion } from 'framer-motion';
import { TFunction } from 'i18next';
import React from 'react';
import ActivityCard from './ActivityCard';
import ProgressCard from './ProgressCard';

interface ActivityItem {
  id: string;
  title: string;
  type: 'interview' | 'quiz' | 'scan';
  score?: number;
  date: string;
  status: 'completed' | 'in_progress' | 'pending';
}

interface SkillProgressItem {
  skill: string;
  level: number;
  maxLevel: number;
}

interface MainContentGridProps {
  recentActivities: ActivityItem[];
  skillProgress: SkillProgressItem[];
  onViewAllActivities: () => void;
  t: TFunction<'common'>;
  className?: string;
}

/**
 * MainContentGrid component for displaying the main content grid (Activities + Progress)
 * @param recentActivities - Array of recent activity items
 * @param skillProgress - Array of skill progress items
 * @param onViewAllActivities - Callback for view all activities action
 * @param t - Translation function
 * @param className - Additional CSS classes
 * @returns {JSX.Element} The MainContentGrid component
 */
const MainContentGrid: React.FC<MainContentGridProps> = ({
  recentActivities,
  skillProgress,
  onViewAllActivities,
  t,
  className = '',
}) => {
  const progressData = skillProgress.map((skill) => ({
    label: skill.skill,
    value: skill.level,
    max: skill.maxLevel,
    color: (skill.level >= 8
      ? 'green'
      : skill.level >= 6
      ? 'blue'
      : skill.level >= 4
      ? 'yellow'
      : 'red') as 'blue' | 'green' | 'yellow' | 'red',
  }));

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 ${className}`}>
      {/* Recent Activities */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="h-full"
      >
        <ActivityCard
          title={t('overview.recentActivities.title', 'Recent Activities')}
          description={t(
            'overview.recentActivities.description',
            'Your latest activities'
          )}
          activities={recentActivities}
          onViewAll={onViewAllActivities}
        />
      </motion.div>

      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="h-full"
      >
        <ProgressCard
          title={t('overview.skillProgress.title', 'Skill Progress')}
          description={t(
            'overview.skillProgress.description',
            'Your level in each technology'
          )}
          progressData={progressData}
        />
      </motion.div>
    </div>
  );
};

export default MainContentGrid;
