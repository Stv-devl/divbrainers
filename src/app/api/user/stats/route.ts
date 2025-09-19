import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/user/stats
 * Mock API for user statistics
 */
export async function GET(request: NextRequest) {
  try {
    // Mock data
    const mockStats = {
      totalInterviews: 12,
      totalQuizzes: 8,
      totalScans: 5,
      averageScore: 78,
      completedActivities: 15,
      inProgressActivities: 3,
      recentActivities: [
        {
          id: '1',
          title: 'React Developer Interview',
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
          title: 'Senior Resume Analysis',
          type: 'scan',
          score: 76,
          date: '2024-01-13',
          status: 'completed',
        },
        {
          id: '4',
          title: 'Full Stack Interview',
          type: 'interview',
          score: null,
          date: '2024-01-12',
          status: 'in_progress',
        },
        {
          id: '5',
          title: 'TypeScript Quiz',
          type: 'quiz',
          score: 88,
          date: '2024-01-11',
          status: 'completed',
        },
      ],
      weeklyProgress: [
        { day: 'Mon', interviews: 2, quizzes: 1, scans: 0 },
        { day: 'Tue', interviews: 1, quizzes: 2, scans: 1 },
        { day: 'Wed', interviews: 3, quizzes: 0, scans: 0 },
        { day: 'Thu', interviews: 0, quizzes: 1, scans: 2 },
        { day: 'Fri', interviews: 1, quizzes: 3, scans: 1 },
        { day: 'Sat', interviews: 0, quizzes: 0, scans: 0 },
        { day: 'Sun', interviews: 1, quizzes: 1, scans: 1 },
      ],
      skillProgress: [
        { skill: 'React', level: 8, maxLevel: 10 },
        { skill: 'JavaScript', level: 9, maxLevel: 10 },
        { skill: 'TypeScript', level: 7, maxLevel: 10 },
        { skill: 'Node.js', level: 6, maxLevel: 10 },
        { skill: 'CSS', level: 8, maxLevel: 10 },
      ],
    };

    return NextResponse.json(mockStats);
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
