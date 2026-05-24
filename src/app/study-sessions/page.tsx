'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  Clock, 
  BookOpen,
  Target,
  CheckCircle,
  Plus,
  Calendar,
  TrendingUp
} from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { api } from '@/lib/api';

interface StudySession {
  id: number;
  topic: string;
  type: string;
  durationMinutes: number;
  status: string;
  startTime: string;
  endTime?: string;
  focusScore?: number;
  comprehensionScore?: number;
  aiSummary?: string;
}

export default function StudySessionsPage() {
  const [mounted, setMounted] = useState(false);
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSession, setActiveSession] = useState<StudySession | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newSession, setNewSession] = useState({
    topic: '',
    type: 'FOCUSED',
    studyPlanId: null
  });

  useEffect(() => {
    setMounted(true);
    fetchSessions();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeSession) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeSession]);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const response = await api.getStudySessions();
      setSessions(response.data);
    } catch (err) {
      setError('Failed to load study sessions');
    } finally {
      setLoading(false);
    }
  };

  const handleStartSession = async () => {
    try {
      const response = await api.createStudySession({
        ...newSession,
        startTime: new Date().toISOString()
      });
      setActiveSession(response.data);
      setShowCreateModal(false);
      setNewSession({ topic: '', type: 'FOCUSED', studyPlanId: null });
    } catch (err) {
      setError('Failed to start session');
    }
  };

  const handleCompleteSession = async () => {
    if (!activeSession) return;
    try {
      await api.completeStudySession(activeSession.id);
      setActiveSession(null);
      setElapsedTime(0);
      fetchSessions();
    } catch (err) {
      setError('Failed to complete session');
    }
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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
              Study Sessions
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Track your study time and focus
            </p>
          </div>
          {!activeSession && (
            <Button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Session
            </Button>
          )}
        </motion.div>

        {/* Active Session Timer */}
        {activeSession && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-white dark:from-blue-600 dark:to-purple-700"
          >
            <div className="text-center">
              <div className="text-sm mb-2 opacity-90">Currently studying</div>
              <div className="text-3xl font-bold mb-4">{activeSession.topic}</div>
              <div className="text-6xl font-mono font-bold mb-6">{formatTime(elapsedTime)}</div>
              <div className="flex justify-center gap-4">
                <Button
                  onClick={handleCompleteSession}
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Complete Session
                </Button>
              </div>
            </div>
          </motion.div>
        )}

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
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              </div>
            ))}
          </div>
        ) : (
          /* Sessions List */
          <div className="space-y-4">
            {sessions.map((session, index) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-full ${
                          session.status === 'COMPLETED' 
                            ? 'bg-green-100 dark:bg-green-900' 
                            : 'bg-blue-100 dark:bg-blue-900'
                        }`}>
                          {session.status === 'COMPLETED' ? (
                            <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                          ) : (
                            <Play className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {session.topic}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {session.durationMinutes} min
                            </span>
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(session.startTime).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline" className="dark:border-gray-600 dark:text-white">
                          {session.type}
                        </Badge>
                        {session.focusScore && (
                          <Badge variant="secondary" className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">
                            Focus: {session.focusScore}%
                          </Badge>
                        )}
                      </div>
                    </div>
                    {session.aiSummary && (
                      <div className="mt-4 pt-4 border-t dark:border-gray-700">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <span className="font-semibold">AI Summary:</span> {session.aiSummary}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && sessions.length === 0 && !activeSession && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <BookOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No study sessions yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Start your first study session to track your progress
            </p>
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Start Session
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
              <h2 className="text-xl font-bold mb-4 dark:text-white">Start Study Session</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-white">Topic</label>
                  <Input
                    value={newSession.topic}
                    onChange={(e) => setNewSession({ ...newSession, topic: e.target.value })}
                    placeholder="What are you studying?"
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-white">Session Type</label>
                  <select
                    value={newSession.type}
                    onChange={(e) => setNewSession({ ...newSession, type: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="FOCUSED">Focused Study</option>
                    <option value="REVIEW">Review Session</option>
                    <option value="PRACTICE">Practice Session</option>
                    <option value="READING">Reading Session</option>
                  </select>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 dark:border-gray-600 dark:text-white"
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleStartSession} className="flex-1">
                    <Play className="w-4 h-4 mr-2" />
                    Start
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
