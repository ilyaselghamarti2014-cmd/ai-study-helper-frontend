'use client';

import { useState, useEffect } from 'react';
import { isFeatureEnabled } from '@/lib/featureFlags';
import apiClient from '@/lib/apiClient';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface UserStats {
  points: number;
  level: number;
  xpToNextLevel: number;
  currentXp: number;
  streak: number;
  achievements: Achievement[];
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  progress: number;
  target: number;
}

export default function GamificationSystem() {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isFeatureEnabled('gamification')) {
      loadStats();
    }
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      // In production, would call gamification API
      // const response = await apiClient.getUserGamificationStats();
      // setStats(response.data);
      
      // Mock data for now
      setStats({
        points: 2450,
        level: 7,
        xpToNextLevel: 500,
        currentXp: 320,
        streak: 5,
        achievements: [
          { id: 1, title: 'First Steps', description: 'Complete your first study session', icon: '🚀', progress: 1, target: 1, unlockedAt: '2024-01-15' },
          { id: 2, title: 'Quiz Master', description: 'Score 90%+ on 5 quizzes', icon: '🏆', progress: 3, target: 5 },
          { id: 3, title: 'Flashcard Fanatic', description: 'Review 100 flashcards', icon: '📚', progress: 67, target: 100 },
          { id: 4, title: 'Week Warrior', description: 'Study 7 days in a row', icon: '🔥', progress: 5, target: 7 },
          { id: 5, title: 'Knowledge Seeker', description: 'Complete a learning path', icon: '🎓', progress: 0, target: 1 },
          { id: 6, title: 'Exam Champion', description: 'Score 85%+ on exam prep', icon: '🎯', progress: 0, target: 1 },
        ],
      });
    } catch (error) {
      console.error('Failed to load gamification stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isFeatureEnabled('gamification')) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Gamification</h2>

      {loading ? (
        <Card className="p-6 text-center">
          <p>Loading...</p>
        </Card>
      ) : stats ? (
        <div className="space-y-6">
          {/* Level and XP */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="text-4xl font-bold text-blue-600">Level {stats.level}</div>
                <p className="text-gray-600">{stats.points} Total Points</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-orange-600">🔥 {stats.streak}</div>
                <p className="text-gray-600">Day Streak</p>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>XP Progress</span>
                <span>{stats.currentXp} / {stats.xpToNextLevel}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full"
                  style={{ width: `${(stats.currentXp / stats.xpToNextLevel) * 100}%` }}
                />
              </div>
            </div>
          </Card>

          {/* Achievements */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Achievements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stats.achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-4 border rounded ${
                    achievement.unlockedAt ? 'bg-green-50 border-green-200' : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-medium">{achievement.title}</h4>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                      {achievement.unlockedAt ? (
                        <Badge className="mt-2">Unlocked</Badge>
                      ) : (
                        <div className="mt-2">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Progress</span>
                            <span>{achievement.progress}/{achievement.target}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{
                                width: `${(achievement.progress / achievement.target) * 100}%`
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Daily Challenges */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Daily Challenges</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                <div>
                  <h4 className="font-medium">Study for 30 minutes</h4>
                  <p className="text-sm text-gray-600">+50 XP</p>
                </div>
                <Badge>0/30 min</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                <div>
                  <h4 className="font-medium">Complete 10 flashcard reviews</h4>
                  <p className="text-sm text-gray-600">+30 XP</p>
                </div>
                <Badge>0/10</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                <div>
                  <h4 className="font-medium">Take a quiz</h4>
                  <p className="text-sm text-gray-600">+40 XP</p>
                </div>
                <Badge>Not started</Badge>
              </div>
            </div>
          </Card>

          {/* Leaderboard */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Leaderboard</h3>
            <div className="space-y-2">
              {[
                { rank: 1, name: 'You', points: stats.points, isUser: true },
                { rank: 2, name: 'Alex Chen', points: 3200, isUser: false },
                { rank: 3, name: 'Sarah Miller', points: 2950, isUser: false },
                { rank: 4, name: 'John Doe', points: 2800, isUser: false },
                { rank: 5, name: 'Emma Wilson', points: 2650, isUser: false },
              ].map((user) => (
                <div
                  key={user.rank}
                  className={`flex justify-between items-center p-3 rounded ${
                    user.isUser ? 'bg-blue-100' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 font-bold">
                      {user.rank}
                    </div>
                    <span className={user.isUser ? 'font-bold' : ''}>{user.name}</span>
                  </div>
                  <span className="font-medium">{user.points} pts</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      ) : (
        <Card className="p-6 text-center">
          <p className="text-gray-500">No gamification data available.</p>
        </Card>
      )}
    </div>
  );
}
