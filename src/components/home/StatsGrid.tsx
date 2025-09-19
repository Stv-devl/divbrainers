'use client';

import { motion } from 'framer-motion';
import { TFunction } from 'i18next';
import { User, BookOpen, FileText, Award } from 'lucide-react';
import React from 'react';
import StatsCard from './StatsCard';

interface UserStats {
  totalInterviews: number;
  totalQuizzes: number;
  totalScans: number;
  averageScore: number;
}

interface StatsGridProps {
  stats: UserStats;
  t: TFunction<'common'>;
  className?: string;
}

/**
 * StatsGrid component for displaying the statistics cards grid
 * @param stats - User statistics data
 * @param t - Translation function
 * @param className - Additional CSS classes
 * @returns {JSX.Element} The StatsGrid component
 */
const StatsGrid: React.FC<StatsGridProps> = ({ stats, t, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}
    >
      <StatsCard
        title={t('overview.stats.interviews', 'Interviews')}
        value={stats.totalInterviews}
        description={t('overview.stats.totalInterviews', 'Total interviews')}
        icon={User}
        trend={{ value: 12, isPositive: true }}
      />
      <StatsCard
        title={t('overview.stats.quizzes', 'Quizzes')}
        value={stats.totalQuizzes}
        description={t('overview.stats.completedQuizzes', 'Completed quizzes')}
        icon={BookOpen}
        trend={{ value: 8, isPositive: true }}
      />
      <StatsCard
        title={t('overview.stats.scans', 'Resume Scans')}
        value={stats.totalScans}
        description={t('overview.stats.scannedCvs', 'Scanned Resumes')}
        icon={FileText}
        trend={{ value: 5, isPositive: true }}
      />
      <StatsCard
        title={t('overview.stats.averageScore', 'Average Score')}
        value={`${stats.averageScore}%`}
        description={t(
          'overview.stats.globalPerformance',
          'Global performance'
        )}
        icon={Award}
        trend={{ value: 3, isPositive: true }}
      />
    </motion.div>
  );
};

export default StatsGrid;
