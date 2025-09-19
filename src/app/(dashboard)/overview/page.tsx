'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useClientTranslation } from '@/hooks/i18n/useClientTranslation';
import { useUserStats } from '@/hooks/useUserStats';
import StatsCard from '@/components/home/StatsCard';
import ActivityCard from '@/components/home/ActivityCard';
import ProgressCard from '@/components/home/ProgressCard';
import Button from '@/components/ui/buttons/Button';
import {
  User,
  BookOpen,
  FileText,
  TrendingUp,
  Calendar,
  Target,
  Award,
  BarChart3,
} from 'lucide-react';

/**
 * Overview page component displaying user statistics and activities
 * @returns {JSX.Element} The Overview page component
 */
const OverviewPage = () => {
  const router = useRouter();
  const { t, isClient } = useClientTranslation();
  const { stats, loading, error, refetch } = useUserStats();

  if (!isClient) return null;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="space-y-8">
            {/* Header Skeleton */}
            <div className="text-center">
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
            </div>

            {/* Stats Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm"
                >
                  <div className="h-4 bg-gray-200 rounded w-24 mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-20"></div>
                </div>
              ))}
            </div>

            {/* Content Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-48"></div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-16 bg-gray-100 rounded"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Erreur de chargement
            </h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Button
              label="Réessayer"
              onClick={refetch}
              color="filled"
              IconComponent={TrendingUp}
            />
          </div>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📊</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Aucune donnée disponible
            </h2>
            <p className="text-gray-600 mb-6">
              Commencez par créer votre premier entretien ou quiz
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                label="Créer un entretien"
                onClick={() => router.push('/interview')}
                color="filled"
                IconComponent={User}
              />
              <Button
                label="Créer un quiz"
                onClick={() => router.push('/quiz')}
                color="empty"
                IconComponent={BookOpen}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-blue-800 mb-2"
            >
              {t('overview.title', "Vue d'ensemble")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-600 text-lg"
            >
              {t(
                'overview.subtitle',
                'Suivez vos progrès et votre performance'
              )}
            </motion.p>
          </div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <StatsCard
              title="Entretiens"
              value={stats.totalInterviews}
              description="Total des entretiens"
              icon={User}
              trend={{ value: 12, isPositive: true }}
            />
            <StatsCard
              title="Quiz"
              value={stats.totalQuizzes}
              description="Quiz complétés"
              icon={BookOpen}
              trend={{ value: 8, isPositive: true }}
            />
            <StatsCard
              title="Analyses CV"
              value={stats.totalScans}
              description="CVs analysés"
              icon={FileText}
              trend={{ value: 5, isPositive: true }}
            />
            <StatsCard
              title="Score moyen"
              value={`${stats.averageScore}%`}
              description="Performance globale"
              icon={Award}
              trend={{ value: 3, isPositive: true }}
            />
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-lg border border-gray-200 shadow-sm p-6"
          >
            <h2 className="text-xl font-semibold text-blue-800 mb-4">
              Actions rapides
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                label="Nouvel entretien"
                onClick={() => router.push('/interview')}
                color="filled"
                IconComponent={User}
              />
              <Button
                label="Créer un quiz"
                onClick={() => router.push('/quiz')}
                color="empty"
                IconComponent={BookOpen}
              />
              <Button
                label="Analyser un CV"
                onClick={() => router.push('/scan')}
                color="empty"
                IconComponent={FileText}
              />
            </div>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activities */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <ActivityCard
                title="Activités récentes"
                description="Vos dernières activités"
                activities={stats.recentActivities}
                onViewAll={() => router.push('/activities')}
              />
            </motion.div>

            {/* Progress Overview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <ProgressCard
                title="Progression des compétences"
                description="Votre niveau dans chaque technologie"
                progressData={stats.skillProgress.map((skill) => ({
                  label: skill.skill,
                  value: skill.level,
                  max: skill.maxLevel,
                  color:
                    skill.level >= 8
                      ? 'green'
                      : skill.level >= 6
                      ? 'blue'
                      : skill.level >= 4
                      ? 'yellow'
                      : 'red',
                }))}
              />
            </motion.div>
          </div>

          {/* Weekly Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-white rounded-lg border border-gray-200 shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-blue-800">
                  Activité de la semaine
                </h2>
                <p className="text-gray-600">
                  Votre activité des 7 derniers jours
                </p>
              </div>
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>

            <div className="grid grid-cols-7 gap-4">
              {stats.weeklyProgress.map((day, index) => (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-sm font-medium text-gray-600 mb-2">
                    {day.day}
                  </div>
                  <div className="space-y-1">
                    <div className="h-2 bg-blue-100 rounded-full">
                      <div
                        className="h-2 bg-blue-500 rounded-full"
                        style={{
                          width: `${Math.min(
                            (day.interviews / 5) * 100,
                            100
                          )}%`,
                        }}
                      />
                    </div>
                    <div className="text-xs text-gray-500">
                      {day.interviews} entretiens
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default OverviewPage;
