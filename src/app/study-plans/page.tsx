'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Plus, 
  Calendar, 
  Clock, 
  Target,
  TrendingUp,
  Trash2,
  Edit,
  Sparkles
} from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { api } from '@/lib/api';

interface StudyPlan {
  id: number;
  title: string;
  description: string;
  status: string;
  difficulty: string;
  totalHours: number;
  completedHours: number;
  progress: number;
  startDate: string;
  endDate: string;
  dailyStudyHours: number;
  aiGenerated: boolean;
  aiRecommendations?: string;
}

export default function StudyPlansPage() {
  const [mounted, setMounted] = useState(false);
  const [studyPlans, setStudyPlans] = useState<StudyPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPlan, setNewPlan] = useState({
    title: '',
    description: '',
    topics: '',
    difficulty: 'BEGINNER',
    totalHours: 40,
    dailyStudyHours: 2,
    aiGenerated: true
  });

  useEffect(() => {
    setMounted(true);
    fetchStudyPlans();
  }, []);

  const fetchStudyPlans = async () => {
    try {
      setLoading(true);
      const response = await api.getStudyPlans();
      setStudyPlans(response.data);
    } catch (err) {
      setError('Failed to load study plans');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePlan = async () => {
    try {
      const response = await api.createStudyPlan(newPlan);
      setStudyPlans([...studyPlans, response.data]);
      setShowCreateModal(false);
      setNewPlan({
        title: '',
        description: '',
        topics: '',
        difficulty: 'BEGINNER',
        totalHours: 40,
        dailyStudyHours: 2,
        aiGenerated: true
      });
    } catch (err) {
      setError('Failed to create study plan');
    }
  };

  const handleDeletePlan = async (id: number) => {
    try {
      await api.deleteStudyPlan(id);
      setStudyPlans(studyPlans.filter(plan => plan.id !== id));
    } catch (err) {
      setError('Failed to delete study plan');
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
      <div className="w-full space-y-8 px-4 sm:px-0">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Study Plans
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Create and manage your personalized study plans
            </p>
          </div>
          <Button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Study Plan
          </Button>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              </div>
            ))}
          </div>
        ) : (
          /* Study Plans Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studyPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg dark:text-white">
                          {plan.title}
                        </CardTitle>
                        <CardDescription className="dark:text-gray-400">
                          {plan.description}
                        </CardDescription>
                      </div>
                      {plan.aiGenerated && (
                        <Badge variant="secondary" className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">
                          <Sparkles className="w-3 h-3 mr-1" />
                          AI Generated
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600 dark:text-gray-400">Progress</span>
                        <span className="font-semibold dark:text-white">{Math.round(plan.progress)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${plan.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <Clock className="w-4 h-4 mr-2" />
                        {plan.completedHours}/{plan.totalHours}h
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <Target className="w-4 h-4 mr-2" />
                        {plan.difficulty}
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(plan.startDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        {plan.dailyStudyHours}h/day
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-4 border-t dark:border-gray-700">
                      <Button variant="outline" size="sm" className="flex-1 dark:border-gray-600 dark:text-white">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeletePlan(plan.id)}
                        className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && studyPlans.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <BookOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No study plans yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Create your first study plan to get started
            </p>
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Study Plan
            </Button>
          </motion.div>
        )}

        {/* Create Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full"
            >
              <h2 className="text-xl font-bold mb-4 dark:text-white">Create Study Plan</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-white">Title</label>
                  <Input
                    value={newPlan.title}
                    onChange={(e) => setNewPlan({ ...newPlan, title: e.target.value })}
                    placeholder="Enter plan title"
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-white">Description</label>
                  <Input
                    value={newPlan.description}
                    onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
                    placeholder="Enter description"
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-white">Topics (comma-separated)</label>
                  <Input
                    value={newPlan.topics}
                    onChange={(e) => setNewPlan({ ...newPlan, topics: e.target.value })}
                    placeholder="e.g., Math, Physics, Chemistry"
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-white">Total Hours</label>
                    <Input
                      type="number"
                      value={newPlan.totalHours}
                      onChange={(e) => setNewPlan({ ...newPlan, totalHours: parseInt(e.target.value) })}
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-white">Daily Hours</label>
                    <Input
                      type="number"
                      value={newPlan.dailyStudyHours}
                      onChange={(e) => setNewPlan({ ...newPlan, dailyStudyHours: parseInt(e.target.value) })}
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 dark:border-gray-600 dark:text-white"
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleCreatePlan} className="flex-1">
                    Create Plan
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
