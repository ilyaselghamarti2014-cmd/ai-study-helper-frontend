'use client';

import { useState, useEffect } from 'react';
import { isFeatureEnabled } from '@/lib/featureFlags';
import apiClient from '@/lib/apiClient';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface StudySession {
  id: number;
  topic: string;
  duration: number;
  startTime: string;
  endTime: string;
  focusScore: number;
}

export default function ProductivityTracker() {
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [isTracking, setIsTracking] = useState(false);
  const [currentSession, setCurrentSession] = useState<StudySession | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isFeatureEnabled('productivityTracker')) {
      loadSessions();
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTracking && currentSession) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - new Date(currentSession.startTime).getTime()) / 1000 / 60));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking, currentSession]);

  const loadSessions = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getStudySessions();
      setSessions(response.data);
    } catch (error) {
      console.error('Failed to load sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const startSession = async () => {
    if (!topic.trim()) return;

    try {
      const response = await apiClient.createStudySession({
        topic,
        startTime: new Date().toISOString(),
      });
      setCurrentSession(response.data);
      setIsTracking(true);
      setElapsedTime(0);
    } catch (error) {
      console.error('Failed to start session:', error);
    }
  };

  const stopSession = async () => {
    if (!currentSession) return;

    try {
      await apiClient.updateStudySession(currentSession.id, {
        endTime: new Date().toISOString(),
        duration: elapsedTime,
      });
      setIsTracking(false);
      setCurrentSession(null);
      setElapsedTime(0);
      setTopic('');
      await loadSessions();
    } catch (error) {
      console.error('Failed to stop session:', error);
    }
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getTotalStudyTime = () => {
    return sessions.reduce((total, session) => total + session.duration, 0);
  };

  const getAverageFocusScore = () => {
    if (sessions.length === 0) return 0;
    return Math.round(sessions.reduce((total, session) => total + session.focusScore, 0) / sessions.length);
  };

  if (!isFeatureEnabled('productivityTracker')) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Productivity Tracker</h2>

      {/* Active Session */}
      <Card className="p-6">
        {isTracking && currentSession ? (
          <div className="text-center space-y-4">
            <div>
              <p className="text-gray-600">Currently studying:</p>
              <h3 className="text-2xl font-bold">{currentSession.topic}</h3>
            </div>
            <div className="text-5xl font-bold text-blue-600">{formatTime(elapsedTime)}</div>
            <Button onClick={stopSession} size="lg" variant="destructive">
              Stop Session
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">What are you studying?</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Mathematics, Physics, Programming"
                className="w-full p-3 border rounded"
              />
            </div>
            <Button
              onClick={startSession}
              disabled={!topic.trim()}
              className="w-full"
              size="lg"
            >
              Start Study Session
            </Button>
          </div>
        )}
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 text-center">
          <div className="text-3xl font-bold text-blue-600">{formatTime(getTotalStudyTime())}</div>
          <p className="text-gray-600">Total Study Time</p>
        </Card>
        <Card className="p-6 text-center">
          <div className="text-3xl font-bold text-green-600">{sessions.length}</div>
          <p className="text-gray-600">Sessions Completed</p>
        </Card>
        <Card className="p-6 text-center">
          <div className="text-3xl font-bold text-purple-600">{getAverageFocusScore()}/10</div>
          <p className="text-gray-600">Avg Focus Score</p>
        </Card>
      </div>

      {/* Recent Sessions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Sessions</h3>
        {loading ? (
          <p>Loading...</p>
        ) : sessions.length === 0 ? (
          <p className="text-gray-500">No study sessions yet. Start your first session!</p>
        ) : (
          <div className="space-y-3">
            {sessions.slice(0, 10).map((session) => (
              <div key={session.id} className="p-4 border rounded hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{session.topic}</h4>
                    <p className="text-sm text-gray-500">
                      {new Date(session.startTime).toLocaleDateString()} • {formatTime(session.duration)}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 items-end">
                    <Badge variant="outline">Focus: {session.focusScore}/10</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
