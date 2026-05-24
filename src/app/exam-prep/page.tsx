'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  GraduationCap, 
  Clock, 
  Target,
  TrendingUp,
  Play,
  CheckCircle,
  Calendar,
  BookOpen,
  Award,
  Sparkles,
  Plus
} from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { useTheme } from '@/contexts/ThemeContext';
import { aiApi } from '@/lib/api';

interface Exam {
  id: string;
  name: string;
  subject: string;
  date: string;
  status: 'upcoming' | 'in_progress' | 'completed';
  score?: number;
  topics: string[];
  preparationLevel: number;
}

interface PracticeTest {
  id: string;
  title: string;
  subject: string;
  questions: number;
  duration: number;
  difficulty: string;
}

export default function ExamPrepPage() {
  const [mounted, setMounted] = useState(false);
  const [exams, setExams] = useState<Exam[]>([]);
  const [practiceTests, setPracticeTests] = useState<PracticeTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [generatingQuiz, setGeneratingQuiz] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('');

  useEffect(() => {
    setMounted(true);
    fetchExamData();
  }, []);

  const fetchExamData = async () => {
    try {
      setLoading(true);
      // Mock data - in real implementation, this would come from API
      setExams([
        {
          id: '1',
          name: 'Calculus Midterm',
          subject: 'Mathematics',
          date: '2024-06-15',
          status: 'upcoming',
          topics: ['Derivatives', 'Integrals', 'Limits'],
          preparationLevel: 75
        },
        {
          id: '2',
          name: 'Physics Final',
          subject: 'Physics',
          date: '2024-06-20',
          status: 'upcoming',
          topics: ['Mechanics', 'Thermodynamics', 'Waves'],
          preparationLevel: 60
        }
      ]);
      
      setPracticeTests([
        {
          id: '1',
          title: 'Calculus Practice Test',
          subject: 'Mathematics',
          questions: 20,
          duration: 60,
          difficulty: 'Medium'
        },
        {
          id: '2',
          title: 'Physics Quiz',
          subject: 'Physics',
          questions: 15,
          duration: 45,
          difficulty: 'Hard'
        }
      ]);
    } catch (err) {
      setError('Failed to load exam data');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateQuiz = async () => {
    if (!selectedSubject) return;
    try {
      setGeneratingQuiz(true);
      const response = await aiApi.generateQuiz({
        topic: selectedSubject,
        difficulty: 'MEDIUM',
        questionCount: 10,
        questionType: 'multiple_choice'
      });
      setGeneratingQuiz(false);
    } catch (err) {
      setError('Failed to generate quiz');
      setGeneratingQuiz(false);
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
            Exam Preparation
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Prepare for your exams with AI-powered practice tests and study plans
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Upcoming Exams */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Upcoming Exams
                </h2>
                <Button variant="outline" className="dark:border-gray-600 dark:text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Exam
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {exams.map((exam, index) => (
                  <motion.div
                    key={exam.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <Card className="dark:bg-gray-800 dark:border-gray-700">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg dark:text-white">
                              {exam.name}
                            </CardTitle>
                            <CardDescription className="dark:text-gray-400">
                              {exam.subject}
                            </CardDescription>
                          </div>
                          <Badge className={
                            exam.status === 'upcoming' ? 'bg-blue-500' :
                            exam.status === 'in_progress' ? 'bg-yellow-500' :
                            'bg-green-500'
                          }>
                            {exam.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <Calendar className="w-4 h-4 mr-2" />
                          {new Date(exam.date).toLocaleDateString()}
                        </div>

                        {/* Topics */}
                        <div>
                          <p className="text-sm font-medium mb-2 dark:text-white">Topics:</p>
                          <div className="flex flex-wrap gap-2">
                            {exam.topics.map((topic, i) => (
                              <Badge key={i} variant="outline" className="dark:border-gray-600 dark:text-white">
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Preparation Progress */}
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600 dark:text-gray-400">Preparation</span>
                            <span className="font-semibold dark:text-white">{exam.preparationLevel}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all"
                              style={{ width: `${exam.preparationLevel}%` }}
                            />
                          </div>
                        </div>

                        <Button className="w-full bg-blue-600 hover:bg-blue-700">
                          <Play className="w-4 h-4 mr-2" />
                          Start Practice
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* AI Quiz Generator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 dark:border-purple-700">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <CardTitle className="dark:text-white">AI Quiz Generator</CardTitle>
                  </div>
                  <CardDescription className="dark:text-gray-400">
                    Generate personalized practice quizzes using AI
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <Input
                      placeholder="Enter subject or topic..."
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      className="flex-1 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    />
                    <Button
                      onClick={handleGenerateQuiz}
                      disabled={generatingQuiz || !selectedSubject}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      {generatingQuiz ? (
                        <>
                          <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Generate Quiz
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Practice Tests */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Practice Tests
                </h2>
                <Badge variant="secondary" className="dark:bg-gray-700 dark:text-white">
                  {practiceTests.length} available
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {practiceTests.map((test, index) => (
                  <motion.div
                    key={test.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                            <GraduationCap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                          </div>
                          <Badge variant="outline" className="dark:border-gray-600 dark:text-white">
                            {test.difficulty}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {test.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          {test.subject}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                          <div className="flex items-center">
                            <BookOpen className="w-4 h-4 mr-1" />
                            {test.questions} questions
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {test.duration} min
                          </div>
                        </div>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">
                          <Play className="w-4 h-4 mr-2" />
                          Start Test
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Study Tips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="dark:text-white">AI Study Tips</CardTitle>
                  <CardDescription className="dark:text-gray-400">
                    Personalized recommendations for exam success
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Target className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Focus on your weakest topics first - spend 30% more time on areas where you scored below 70%
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Take practice tests every 3 days to track your progress and identify knowledge gaps
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Award className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Use spaced repetition for formulas and definitions - review them at increasing intervals
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
