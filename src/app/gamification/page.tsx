'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy, 
  Star, 
  Target, 
  Flame,
  Zap,
  Award,
  TrendingUp,
  Calendar,
  Lock
} from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { api } from '@/lib/api';

interface Achievement {
  id: number;
  code: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  type: string;
  unlocked: boolean;
  unlockedAt?: string;
}

interface UserProgress {
  level: number;
  experiencePoints: number;
  experienceToNextLevel: number;
  totalPoints: number;
  totalStudyHours: number;
  totalSessions: number;
  currentStreak: number;
  longestStreak: number;
  quizzesCompleted: number;
  flashcardsMastered: number;
  notesCreated: number;
}

export default function GamificationPage() {
  const [mounted, setMounted] = useState(false);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    fetchGamificationData();
  }, []);

  const fetchGamificationData = async () => {
    try {
      setLoading(true);
      const [achievementsRes, progressRes] = await Promise.all([
        api.getUserAchievements(),
        api.getUserProgress()
      ]);
      setAchievements(achievementsRes.data);
      setUserProgress(progressRes.data);
    } catch (err) {
      setError('Failed to load gamification data');
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
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Gamification
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Track your achievements and level up your learning journey
          </p>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              </div>
            ))}
          </div>
        ) : userProgress ? (
          <>
            {/* Level and Progress Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white dark:from-blue-600 dark:to-purple-700">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl">Level {userProgress.level}</CardTitle>
                      <CardDescription className="text-blue-100">
                        {userProgress.experiencePoints} / {userProgress.experienceToNextLevel} XP
                      </CardDescription>
                    </div>
                    <Star className="w-12 h-12 text-yellow-300" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="w-full bg-white/20 rounded-full h-4 mb-4">
                    <div
                      className="bg-white h-4 rounded-full transition-all"
                      style={{ width: `${(userProgress.experiencePoints / userProgress.experienceToNextLevel) * 100}%` }}
                    />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center">
                      <Zap className="w-4 h-4 mr-2" />
                      {userProgress.totalPoints} pts
                    </div>
                    <div className="flex items-center">
                      <Flame className="w-4 h-4 mr-2" />
                      {userProgress.currentStreak} day streak
                    </div>
                    <div className="flex items-center">
                      <Target className="w-4 h-4 mr-2" />
                      {userProgress.longestStreak} best
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      {userProgress.totalStudyHours.toFixed(1)}h studied
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900 dark:text-white">
                        {userProgress.totalSessions}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Sessions</div>
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
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900 dark:text-white">
                        {userProgress.quizzesCompleted}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Quizzes</div>
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
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900 dark:text-white">
                        {userProgress.flashcardsMastered}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Flashcards</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900 dark:text-white">
                        {userProgress.notesCreated}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Notes</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Achievements Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Achievements
                </h2>
                <Badge variant="secondary" className="dark:bg-gray-700 dark:text-white">
                  {achievements.filter(a => a.unlocked).length} / {achievements.length} Unlocked
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.05 }}
                  >
                    <Card className={`${
                      achievement.unlocked
                        ? 'bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-700'
                        : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 opacity-60'
                    }`}>
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <div className={`text-4xl ${achievement.unlocked ? '' : 'grayscale'}`}>
                            {achievement.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-gray-900 dark:text-white">
                                {achievement.title}
                              </h3>
                              {!achievement.unlocked && (
                                <Lock className="w-4 h-4 text-gray-400" />
                              )}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              {achievement.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <Badge variant="outline" className="dark:border-gray-600 dark:text-white">
                                {achievement.type}
                              </Badge>
                              <Badge className={achievement.unlocked ? 'bg-yellow-500' : 'bg-gray-400'}>
                                +{achievement.points} pts
                              </Badge>
                            </div>
                            {achievement.unlockedAt && (
                              <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                                <Calendar className="w-3 h-3 mr-1" />
                                {new Date(achievement.unlockedAt).toLocaleDateString()}
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        ) : null}
      </div>
    </DashboardLayout>
  );
}
