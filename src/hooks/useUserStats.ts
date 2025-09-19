'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface UserStats {
  totalInterviews: number;
  totalQuizzes: number;
  totalScans: number;
  averageScore: number;
  completedActivities: number;
  inProgressActivities: number;
  recentActivities: Array<{
    id: string;
    title: string;
    type: 'interview' | 'quiz' | 'scan';
    score?: number;
    date: string;
    status: 'completed' | 'in_progress' | 'pending';
  }>;
  weeklyProgress: Array<{
    day: string;
    interviews: number;
    quizzes: number;
    scans: number;
  }>;
  skillProgress: Array<{
    skill: string;
    level: number;
    maxLevel: number;
  }>;
}

interface UseUserStatsReturn {
  stats: UserStats | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Hook for fetching and managing user statistics
 * @returns {UseUserStatsReturn} User stats data and loading states
 */
export const useUserStats = (): UseUserStatsReturn => {
  const { data: session } = useSession();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    if (!session?.user?.email) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Fetch user statistics from the API
      const response = await fetch('/api/user/stats', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user statistics');
      }

      const data = await response.json();
      setStats(data);
    } catch (err) {
      console.error('Error fetching user stats:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');

      // Set mock data for development/demo purposes
      setStats({
        totalInterviews: 12,
        totalQuizzes: 8,
        totalScans: 5,
        averageScore: 78,
        completedActivities: 20,
        inProgressActivities: 3,
        recentActivities: [
          {
            id: '1',
            title: 'React Frontend Interview',
            type: 'interview',
            score: 85,
            date: '2024-01-15',
            status: 'completed',
          },
          {
            id: '2',
            title: 'Advanced JavaScript Quiz',
            type: 'quiz',
            score: 92,
            date: '2024-01-14',
            status: 'completed',
          },
          {
            id: '3',
            title: 'Full Stack Developer Resume Analysis',
            type: 'scan',
            date: '2024-01-13',
            status: 'in_progress',
          },
        ],
        weeklyProgress: [
          { day: 'Mon', interviews: 2, quizzes: 1, scans: 0 },
          { day: 'Tue', interviews: 1, quizzes: 2, scans: 1 },
          { day: 'Wed', interviews: 3, quizzes: 0, scans: 1 },
          { day: 'Thu', interviews: 1, quizzes: 1, scans: 0 },
          { day: 'Fri', interviews: 2, quizzes: 2, scans: 2 },
          { day: 'Sat', interviews: 0, quizzes: 1, scans: 1 },
          { day: 'Sun', interviews: 1, quizzes: 0, scans: 0 },
        ],
        skillProgress: [
          { skill: 'React', level: 8, maxLevel: 10 },
          { skill: 'JavaScript', level: 9, maxLevel: 10 },
          { skill: 'TypeScript', level: 6, maxLevel: 10 },
          { skill: 'Node.js', level: 7, maxLevel: 10 },
          { skill: 'CSS', level: 8, maxLevel: 10 },
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [session?.user?.email]);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats,
  };
};
