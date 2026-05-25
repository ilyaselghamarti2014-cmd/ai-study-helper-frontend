'use client';

import { useState, useEffect } from 'react';
import { isFeatureEnabled } from '@/lib/featureFlags';
import apiClient from '@/lib/apiClient';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface AnalyticsData {
  totalStudyTime: number;
  quizAttempts: number;
  averageQuizScore: number;
  flashcardReviews: number;
  flashcardAccuracy: number;
  notesCreated: number;
  masteryLevel: number;
  weeklyProgress: number[];
}

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'all'>('week');

  useEffect(() => {
    if (isFeatureEnabled('analyticsDashboard')) {
      loadAnalytics();
    }
  }, [timeRange]);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      // In production, would call analytics API
      // const response = await apiClient.getAnalytics(timeRange);
      // setAnalytics(response.data);
      
      // Mock data for now
      setAnalytics({
        totalStudyTime: 45,
        quizAttempts: 12,
        averageQuizScore: 78,
        flashcardReviews: 156,
        flashcardAccuracy: 85,
        notesCreated: 23,
        masteryLevel: 3,
        weeklyProgress: [2, 4, 3, 5, 4, 6, 5],
      });
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isFeatureEnabled('analyticsDashboard')) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <div className="flex gap-2">
          {(['week', 'month', 'all'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded ${
                timeRange === range
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <Card className="p-6 text-center">
          <p>Loading analytics...</p>
        </Card>
      ) : analytics ? (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-6">
              <div className="text-3xl font-bold text-blue-600">{analytics.totalStudyTime}h</div>
              <p className="text-gray-600">Total Study Time</p>
              <Badge variant="outline" className="mt-2">This {timeRange}</Badge>
            </Card>
            <Card className="p-6">
              <div className="text-3xl font-bold text-green-600">{analytics.quizAttempts}</div>
              <p className="text-gray-600">Quiz Attempts</p>
              <Badge variant="outline" className="mt-2">This {timeRange}</Badge>
            </Card>
            <Card className="p-6">
              <div className="text-3xl font-bold text-purple-600">{analytics.averageQuizScore}%</div>
              <p className="text-gray-600">Avg Quiz Score</p>
              <Badge variant="outline" className="mt-2">This {timeRange}</Badge>
            </Card>
            <Card className="p-6">
              <div className="text-3xl font-bold text-orange-600">{analytics.flashcardReviews}</div>
              <p className="text-gray-600">Flashcard Reviews</p>
              <Badge variant="outline" className="mt-2">This {timeRange}</Badge>
            </Card>
          </div>

          {/* Detailed Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Flashcard Performance</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Accuracy</span>
                    <span>{analytics.flashcardAccuracy}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-green-600 h-3 rounded-full"
                      style={{ width: `${analytics.flashcardAccuracy}%` }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="text-center p-3 bg-green-50 rounded">
                    <div className="text-2xl font-bold text-green-600">
                      {Math.round(analytics.flashcardReviews * (analytics.flashcardAccuracy / 100))}
                    </div>
                    <p className="text-sm text-gray-600">Correct</p>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded">
                    <div className="text-2xl font-bold text-red-600">
                      {Math.round(analytics.flashcardReviews * (1 - analytics.flashcardAccuracy / 100))}
                    </div>
                    <p className="text-sm text-gray-600">Incorrect</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Learning Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Mastery Level</span>
                    <span>{analytics.masteryLevel}/5</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-blue-600 h-3 rounded-full"
                      style={{ width: `${(analytics.masteryLevel / 5) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="text-center p-3 bg-blue-50 rounded">
                    <div className="text-2xl font-bold text-blue-600">{analytics.notesCreated}</div>
                    <p className="text-sm text-gray-600">Notes Created</p>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded">
                    <div className="text-2xl font-bold text-purple-600">{analytics.quizAttempts}</div>
                    <p className="text-sm text-gray-600">Quizzes Taken</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Weekly Progress Chart */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Weekly Study Progress</h3>
            <div className="flex items-end justify-between h-40 gap-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                <div key={day} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-blue-600 rounded-t"
                    style={{
                      height: `${(analytics.weeklyProgress[index] / 8) * 100}%`,
                      minHeight: '20px',
                    }}
                  />
                  <span className="text-xs text-gray-600 mt-2">{day}</span>
                  <span className="text-xs font-medium">{analytics.weeklyProgress[index]}h</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      ) : (
        <Card className="p-6 text-center">
          <p className="text-gray-500">No analytics data available yet.</p>
          <p className="text-sm text-gray-400 mt-2">Start studying to see your progress!</p>
        </Card>
      )}
    </div>
  );
}
