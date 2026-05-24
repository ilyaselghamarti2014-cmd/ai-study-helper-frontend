'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Sparkles, 
  BookOpen, 
  Target,
  TrendingUp,
  RefreshCw,
  Lightbulb,
  CheckCircle
} from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { api, aiApi } from '@/lib/api';

interface Recommendation {
  id: string;
  type: 'study_plan' | 'topic' | 'resource' | 'schedule';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  actionable: boolean;
  completed?: boolean;
}

export default function AIRecommendationsPage() {
  const [mounted, setMounted] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [currentTopic, setCurrentTopic] = useState('');

  useEffect(() => {
    setMounted(true);
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      // In a real implementation, this would call the AI service
      // For now, we'll use mock data
      setRecommendations([
        {
          id: '1',
          type: 'study_plan',
          title: 'Create a study plan for Calculus',
          description: 'Based on your recent activity, creating a structured study plan for Calculus would help you improve your mastery level.',
          priority: 'high',
          actionable: true
        },
        {
          id: '2',
          type: 'topic',
          title: 'Focus on Linear Algebra',
          description: 'Your analytics show you need more practice with Linear Algebra concepts. Consider dedicating 2 hours daily.',
          priority: 'high',
          actionable: true
        },
        {
          id: '3',
          type: 'resource',
          title: 'Try interactive exercises',
          description: 'Interactive exercises have been shown to improve retention by 40%. Try them for your next Physics session.',
          priority: 'medium',
          actionable: true
        },
        {
          id: '4',
          type: 'schedule',
          title: 'Optimize your study schedule',
          description: 'Your peak performance time is in the morning. Schedule your most challenging topics between 8-10 AM.',
          priority: 'medium',
          actionable: true
        }
      ]);
    } catch (err) {
      setError('Failed to load recommendations');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateRecommendations = async () => {
    if (!currentTopic) return;
    try {
      setGenerating(true);
      const response = await aiApi.generateStudyPlan({
        topics: [currentTopic],
        difficulty: 'INTERMEDIATE',
        totalHours: 20
      });
      // Process the AI response and add to recommendations
      setGenerating(false);
    } catch (err) {
      setError('Failed to generate recommendations');
      setGenerating(false);
    }
  };

  const handleCompleteRecommendation = (id: string) => {
    setRecommendations(recommendations.map(rec => 
      rec.id === id ? { ...rec, completed: true } : rec
    ));
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
              AI Recommendations
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Personalized learning suggestions powered by AI
            </p>
          </div>
          <Button
            onClick={fetchRecommendations}
            variant="outline"
            className="dark:border-gray-600 dark:text-white"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </motion.div>

        {/* Generate New Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 dark:border-purple-700">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <Input
                  placeholder="Enter a topic to get AI recommendations..."
                  value={currentTopic}
                  onChange={(e) => setCurrentTopic(e.target.value)}
                  className="flex-1 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
                <Button
                  onClick={handleGenerateRecommendations}
                  disabled={generating || !currentTopic}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {generating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
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
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              </div>
            ))}
          </div>
        ) : (
          /* Recommendations List */
          <div className="space-y-4">
            {recommendations.map((recommendation, index) => (
              <motion.div
                key={recommendation.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`${
                  recommendation.completed
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700'
                    : 'dark:bg-gray-800 dark:border-gray-700'
                }`}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-full ${
                        recommendation.type === 'study_plan' ? 'bg-blue-100 dark:bg-blue-900' :
                        recommendation.type === 'topic' ? 'bg-purple-100 dark:bg-purple-900' :
                        recommendation.type === 'resource' ? 'bg-green-100 dark:bg-green-900' :
                        'bg-orange-100 dark:bg-orange-900'
                      }`}>
                        {recommendation.type === 'study_plan' && <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
                        {recommendation.type === 'topic' && <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />}
                        {recommendation.type === 'resource' && <Lightbulb className="w-6 h-6 text-green-600 dark:text-green-400" />}
                        {recommendation.type === 'schedule' && <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {recommendation.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              {recommendation.description}
                            </p>
                          </div>
                          {recommendation.completed && (
                            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                          <Badge variant="outline" className="dark:border-gray-600 dark:text-white">
                            {recommendation.type}
                          </Badge>
                          <Badge className={
                            recommendation.priority === 'high' ? 'bg-red-500' :
                            recommendation.priority === 'medium' ? 'bg-yellow-500' :
                            'bg-gray-500'
                          }>
                            {recommendation.priority}
                          </Badge>
                          {recommendation.actionable && !recommendation.completed && (
                            <Button
                              size="sm"
                              onClick={() => handleCompleteRecommendation(recommendation.id)}
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              Mark Complete
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && recommendations.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Brain className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No recommendations yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Enter a topic above to get AI-powered recommendations
            </p>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}
