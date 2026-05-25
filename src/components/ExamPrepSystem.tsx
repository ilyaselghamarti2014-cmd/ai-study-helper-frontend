'use client';

import { useState, useEffect } from 'react';
import { isFeatureEnabled } from '@/lib/featureFlags';
import apiClient from '@/lib/apiClient';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface ExamPrep {
  id: number;
  examName: string;
  subject: string;
  examDate: string;
  daysRemaining: number;
  targetScore: number;
  currentScore: number;
  totalTopics: number;
  completedTopics: number;
  status: string;
  aiGenerated: boolean;
}

interface ExamTopic {
  id: number;
  topicName: string;
  priority: number;
  masteryLevel: number;
  completed: boolean;
  scheduledDate: string;
}

export default function ExamPrepSystem() {
  const [examPreps, setExamPreps] = useState<ExamPrep[]>([]);
  const [currentExam, setCurrentExam] = useState<ExamPrep | null>(null);
  const [topics, setTopics] = useState<ExamTopic[]>([]);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [examName, setExamName] = useState('');
  const [subject, setSubject] = useState('');
  const [examDate, setExamDate] = useState('');
  const [targetScore, setTargetScore] = useState(80);
  const [mode, setMode] = useState<'list' | 'detail' | 'create'>('list');

  useEffect(() => {
    if (isFeatureEnabled('examPrepMode')) {
      loadExamPreps();
    }
  }, []);

  const loadExamPreps = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getExamPreps();
      setExamPreps(response.data);
    } catch (error) {
      console.error('Failed to load exam preps:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadExamTopics = async (examId: number) => {
    try {
      setLoading(true);
      const response = await apiClient.getExamTopics(examId);
      setTopics(response.data);
    } catch (error) {
      console.error('Failed to load topics:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateAIExamPlan = async () => {
    try {
      setGenerating(true);
      const response = await apiClient.generateAIExamPlan(examName, subject, examDate, targetScore);
      await loadExamPreps();
      setExamName('');
      setSubject('');
      setExamDate('');
      setTargetScore(80);
      setMode('list');
    } catch (error) {
      console.error('Failed to generate exam plan:', error);
    } finally {
      setGenerating(false);
    }
  };

  const completeTopic = async (topicId: number) => {
    try {
      await apiClient.completeExamTopic(topicId);
      if (currentExam) {
        await loadExamTopics(currentExam.id);
        await loadExamPreps();
        const updated = examPreps.find(e => e.id === currentExam.id);
        if (updated) setCurrentExam(updated);
      }
    } catch (error) {
      console.error('Failed to complete topic:', error);
    }
  };

  if (!isFeatureEnabled('examPrepMode')) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Exam Preparation</h2>
        <div className="flex gap-2">
          <Button
            variant={mode === 'list' ? 'default' : 'outline'}
            onClick={() => setMode('list')}
          >
            My Exams
          </Button>
          <Button
            variant={mode === 'create' ? 'default' : 'outline'}
            onClick={() => setMode('create')}
          >
            New Exam Plan
          </Button>
        </div>
      </div>

      {mode === 'list' && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Your Exam Plans</h3>
          {loading ? (
            <p>Loading...</p>
          ) : examPreps.length === 0 ? (
            <p className="text-gray-500">No exam plans yet. Create your first one!</p>
          ) : (
            <div className="space-y-3">
              {examPreps.map((exam) => (
                <div
                  key={exam.id}
                  className="p-4 border rounded hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    setCurrentExam(exam);
                    loadExamTopics(exam.id);
                    setMode('detail');
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{exam.examName}</h4>
                      <p className="text-sm text-gray-500">{exam.subject}</p>
                      <p className="text-sm text-gray-400">
                        {exam.daysRemaining} days remaining
                      </p>
                    </div>
                    <div className="flex flex-col gap-1 items-end">
                      <Badge>{exam.status}</Badge>
                      {exam.aiGenerated && <Badge variant="secondary">AI Generated</Badge>}
                      <div className="text-sm text-gray-600 mt-2">
                        {exam.completedTopics}/{exam.totalTopics} topics
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${(exam.completedTopics / exam.totalTopics) * 100}%`
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}

      {mode === 'create' && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Create Exam Plan</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Exam Name</label>
              <Input
                value={examName}
                onChange={(e) => setExamName(e.target.value)}
                placeholder="e.g., Final Exam, SAT, MCAT"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Subject</label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g., Mathematics, Biology, Physics"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Exam Date</label>
              <Input
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Target Score (%)</label>
              <Input
                type="number"
                value={targetScore}
                onChange={(e) => setTargetScore(Number(e.target.value))}
                min={0}
                max={100}
              />
            </div>
            <Button
              onClick={generateAIExamPlan}
              disabled={!examName || !subject || !examDate || generating}
              className="w-full"
            >
              {generating ? 'Generating...' : 'Generate AI Plan'}
            </Button>
          </div>
        </Card>
      )}

      {mode === 'detail' && currentExam && (
        <div className="space-y-4">
          <Card className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold">{currentExam.examName}</h3>
                <p className="text-gray-500">{currentExam.subject}</p>
                <p className="text-sm text-gray-400">
                  {new Date(currentExam.examDate).toLocaleDateString()} ({currentExam.daysRemaining} days)
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">
                  {currentExam.currentScore}%
                </div>
                <p className="text-sm text-gray-500">Current Score</p>
                <div className="text-sm text-gray-400 mt-1">
                  Target: {currentExam.targetScore}%
                </div>
              </div>
            </div>
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span>{currentExam.completedTopics}/{currentExam.totalTopics} topics</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full"
                  style={{
                    width: `${(currentExam.completedTopics / currentExam.totalTopics) * 100}%`
                  }}
                />
              </div>
            </div>
            <Button onClick={() => setMode('list')} variant="outline">
              Back to List
            </Button>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Study Topics</h3>
            {loading ? (
              <p>Loading...</p>
            ) : topics.length === 0 ? (
              <p className="text-gray-500">No topics yet. Add topics to your exam plan!</p>
            ) : (
              <div className="space-y-3">
                {topics
                  .sort((a, b) => b.priority - a.priority)
                  .map((topic) => (
                    <div
                      key={topic.id}
                      className={`p-4 border rounded ${topic.completed ? 'bg-green-50' : 'hover:bg-gray-50'}`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{topic.topicName}</h4>
                            <Badge variant="outline">Priority {topic.priority}</Badge>
                            {topic.completed && <Badge>Completed</Badge>}
                          </div>
                          <div className="text-sm text-gray-500">
                            Mastery: {topic.masteryLevel}/5
                          </div>
                          <div className="text-sm text-gray-400">
                            Scheduled: {new Date(topic.scheduledDate).toLocaleDateString()}
                          </div>
                        </div>
                        {!topic.completed && (
                          <Button
                            onClick={() => completeTopic(topic.id)}
                            size="sm"
                          >
                            Mark Complete
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}
