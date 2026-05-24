'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Target, 
  Award,
  Calendar,
  Clock,
  BookOpen,
  Flame,
  CheckCircle,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { api } from '@/lib/api';

interface ProgressData {
  totalStudyHours: number;
  totalSessions: number;
  averageSessionDuration: number;
  currentStreak: number;
  longestStreak: number;
  topicsMastered: number;
  quizzesCompleted: number;
  averageQuizScore: number;
  weeklyProgress: number[];
  monthlyGoals: {
    target: number;
    current: number;
  }[];
}

export default function ProgressPage() {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState('week');

  useEffect(() => {
    setMounted(true);
    fetchProgress();
  }, [timeRange]);

  const fetchProgress = async () => {
    try {
      setLoading(true);
      // In real implementation, this would call the API
      // For now, using mock data
      setProgress({
        totalStudyHours: 45.5,
        totalSessions: 32,
        averageSessionDuration: 85,
        currentStreak: 7,
        longestStreak: 14,
        topicsMastered: 12,
        quizzesCompleted: 28,
        averageQuizScore: 87,
        weeklyProgress: [2, 3.5, 4, 2.5, 5, 4.5, 6],
        monthlyGoals: [
          { target: 40, current: 45.5 },
          { target: 30, current: 32 },
          { target: 20, current: 28 }
        ]
      });
    } catch (err) {
      setError('Failed to load progress data');
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return (
      <DashboardLayout>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-96"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Learning Progress
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Track your learning journey and achievements
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={timeRange === 'week' ? 'default' : 'outline'}
              onClick={() => setTimeRange('week')}
              className="dark:border-gray-600 dark:text-white"
            >
              Week
            </Button>
            <Button
              variant={timeRange === 'month' ? 'default' : 'outline'}
              onClick={() => setTimeRange('month')}
              className="dark:border-gray-600 dark:text-white"
            >
              Month
            </Button>
            <Button
              variant={timeRange === 'year' ? 'default' : 'outline'}
              onClick={() => setTimeRange('year')}
              className="dark:border-gray-600 dark:text-white"
            >
              Year
            </Button>
          </div>
        </motion.div>

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"
          >
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </motion.div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              </div>
            ))}
          </div>
        ) : progress ? (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Total Study Hours
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-3xl font-bold text-gray-900 dark:text-white">
                        {progress.totalStudyHours.toFixed(1)}h
                      </div>
                      <Clock className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Current Streak
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-3xl font-bold text-gray-900 dark:text-white">
                        {progress.currentStreak}
                      </div>
                      <Flame className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Topics Mastered
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-3xl font-bold text-gray-900 dark:text-white">
                        {progress.topicsMastered}
                      </div>
                      <Target className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Quiz Average
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-3xl font-bold text-gray-900 dark:text-white">
                        {progress.averageQuizScore}%
                      </div>
                      <Award className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Weekly Progress Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="dark:text-white">Study Activity</CardTitle>
                  <CardDescription className="dark:text-gray-400">
                    Hours studied per day
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-end justify-between gap-2">
                    {progress.weeklyProgress.map((hours, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div
                          className="w-full bg-blue-600 rounded-t transition-all hover:bg-blue-700"
                          style={{ height: `${(hours / 6) * 100}%` }}
                        />
                        <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Goals Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="dark:text-white">Monthly Goals</CardTitle>
                  <CardDescription className="dark:text-gray-400">
                    Track your progress towards learning goals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Study Hours Goal</span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                          {progress.monthlyGoals[0].current} / {progress.monthlyGoals[0].target}h
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div
                          className="bg-green-600 h-3 rounded-full transition-all"
                          style={{ width: `${Math.min((progress.monthlyGoals[0].current / progress.monthlyGoals[0].target) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Sessions Goal</span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                          {progress.monthlyGoals[1].current} / {progress.monthlyGoals[1].target}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div
                          className="bg-blue-600 h-3 rounded-full transition-all"
                          style={{ width: `${Math.min((progress.monthlyGoals[1].current / progress.monthlyGoals[1].target) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Quizzes Goal</span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                          {progress.monthlyGoals[2].current} / {progress.monthlyGoals[2].target}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div
                          className="bg-purple-600 h-3 rounded-full transition-all"
                          style={{ width: `${Math.min((progress.monthlyGoals[2].current / progress.monthlyGoals[2].target) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="dark:text-white">Recent Achievements</CardTitle>
                  <CardDescription className="dark:text-gray-400">
                    Milestones you've reached recently
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">7-Day Study Streak</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Achieved yesterday</p>
                      </div>
                      <ArrowUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">10 Topics Mastered</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Achieved 3 days ago</p>
                      </div>
                      <ArrowUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">Quiz Champion</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">25 quizzes completed</p>
                      </div>
                      <ArrowUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </>
        ) : null}
      </div>
    </DashboardLayout>
  );
}
