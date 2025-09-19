'use client';

import { motion } from 'framer-motion';
import { TFunction } from 'i18next';
import React from 'react';
import HomeHeader from './HomeHeader';
import MainContentGrid from './MainContentGrid';
import StatsGrid from './StatsGrid';

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

interface UserStats {
  totalInterviews: number;
  totalQuizzes: number;
  totalScans: number;
  averageScore: number;
  recentActivities: ActivityItem[];
  skillProgress: SkillProgressItem[];
}

interface HomePageLayoutProps {
  stats: UserStats;
  t: TFunction<'common'>;
  className?: string;
}

/**
 * HomePageLayout component - Main layout container for the home page
 * @param stats - User statistics data
 * @param t - Translation function
 * @param className - Additional CSS classes
 * @returns {JSX.Element} The HomePageLayout component
 */
const HomePageLayout: React.FC<HomePageLayoutProps> = ({
  stats,
  t,
  className = '',
}) => {
  const handleViewAllActivities = () => {
    // This will be handled by the parent component
    console.log('View all activities clicked');
  };

  return (
    <div className={`min-h-screen bg-gray-50 py-8 ${className}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Header */}
          <HomeHeader
            title={t('overview.title', "Vue d'ensemble")}
            subtitle={t(
              'overview.subtitle',
              'Suivez vos progrès et votre performance'
            )}
          />

          {/* Stats Cards */}
          <StatsGrid stats={stats} t={t} />

          {/* Main Content Grid */}
          <MainContentGrid
            recentActivities={stats.recentActivities}
            skillProgress={stats.skillProgress}
            onViewAllActivities={handleViewAllActivities}
            t={t}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default HomePageLayout;
