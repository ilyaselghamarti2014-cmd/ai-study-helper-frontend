'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  LineChart, 
  BarChart, 
  PieChart,
  TrendingUp,
  Clock,
  Target,
  Brain,
  BookOpen,
  Award,
  Calendar,
  Download
} from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { api } from '@/lib/api';

interface AnalyticsData {
  totalStudyHours: number;
  averageSessionDuration: number;
  masteryLevel: number;
  topicsStudied: number;
  quizAccuracy: number;
  flashcardAccuracy: number;
  studyTrends: any[];
  topicBreakdown: any[];
  aiRecommendations: string;
}

export default function AnalyticsPage() {
  const [mounted, setMounted] = useState(false);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [trends, setTrends] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState(30);

  useEffect(() => {
    setMounted(true);
    fetchAnalytics();
    fetchTrends();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await api.getAnalytics();
      setAnalytics(response.data);
    } catch (err) {
      setError('Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  const fetchTrends = async () => {
    try {
      const response = await api.getStudyTrends(timeRange);
      setTrends(response.data);
    } catch (err) {
      console.error('Failed to load trends');
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
              AI Analytics
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Track your learning progress with AI-powered insights
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={timeRange === 7 ? 'default' : 'outline'}
              onClick={() => setTimeRange(7)}
              className="dark:border-gray-600 dark:text-white"
            >
              7 Days
            </Button>
            <Button
              variant={timeRange === 30 ? 'default' : 'outline'}
              onClick={() => setTimeRange(30)}
              className="dark:border-gray-600 dark:text-white"
            >
              30 Days
            </Button>
            <Button
              variant={timeRange === 90 ? 'default' : 'outline'}
              onClick={() => setTimeRange(90)}
              className="dark:border-gray-600 dark:text-white"
            >
              90 Days
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
        ) : analytics ? (
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
                        {analytics.totalStudyHours.toFixed(1)}h
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
                      Average Session
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-3xl font-bold text-gray-900 dark:text-white">
                        {analytics.averageSessionDuration.toFixed(0)}m
                      </div>
                      <Target className="w-8 h-8 text-green-600 dark:text-green-400" />
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
                      Mastery Level
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-3xl font-bold text-gray-900 dark:text-white">
                        {Math.round(analytics.masteryLevel)}%
                      </div>
                      <Brain className="w-8 h-8 text-purple-600 dark:text-purple-400" />
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
                      Topics Studied
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-3xl font-bold text-gray-900 dark:text-white">
                        {analytics.topicsStudied}
                      </div>
                      <BookOpen className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Study Trends */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="dark:text-white">Study Trends</CardTitle>
                    <CardDescription className="dark:text-gray-400">
                      Your study activity over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                      <div className="text-center">
                        <LineChart className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                        <p className="text-gray-500 dark:text-gray-400">Study trends chart</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Topic Breakdown */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="dark:text-white">Topic Breakdown</CardTitle>
                    <CardDescription className="dark:text-gray-400">
                      Time spent per topic
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                      <div className="text-center">
                        <PieChart className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                        <p className="text-gray-500 dark:text-gray-400">Topic distribution chart</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Performance Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="dark:text-white">Performance Metrics</CardTitle>
                  <CardDescription className="dark:text-gray-400">
                    Quiz and flashcard accuracy
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Quiz Accuracy</span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">{Math.round(analytics.quizAccuracy)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div
                          className="bg-blue-600 h-3 rounded-full transition-all"
                          style={{ width: `${analytics.quizAccuracy}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Flashcard Accuracy</span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">{Math.round(analytics.flashcardAccuracy)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div
                          className="bg-green-600 h-3 rounded-full transition-all"
                          style={{ width: `${analytics.flashcardAccuracy}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* AI Recommendations */}
            {analytics.aiRecommendations && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 dark:border-purple-700">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Brain className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      <CardTitle className="dark:text-white">AI Recommendations</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                      {analytics.aiRecommendations}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </>
        ) : null}
      </div>
    </DashboardLayout>
  );
}
