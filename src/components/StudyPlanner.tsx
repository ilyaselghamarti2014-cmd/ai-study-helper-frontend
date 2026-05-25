'use client';

import { useState, useEffect } from 'react';
import { isFeatureEnabled } from '@/lib/featureFlags';
import apiClient from '@/lib/apiClient';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface StudyPlan {
  id: number;
  title: string;
  description: string;
  status: string;
  difficulty: string;
  totalHours: number;
  completedHours: number;
  startDate: string;
  endDate: string;
  dailyStudyHours: number;
  aiGenerated: boolean;
}

interface StudyPlanGoal {
  id: number;
  title: string;
  targetDate: string;
  completed: boolean;
}

export default function StudyPlanner() {
  const [plans, setPlans] = useState<StudyPlan[]>([]);
  const [currentPlan, setCurrentPlan] = useState<StudyPlan | null>(null);
  const [goals, setGoals] = useState<StudyPlanGoal[]>([]);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('BEGINNER');
  const [totalHours, setTotalHours] = useState(40);
  const [dailyHours, setDailyHours] = useState(2);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [mode, setMode] = useState<'list' | 'detail' | 'create'>('list');

  useEffect(() => {
    if (isFeatureEnabled('studyPlanner')) {
      loadStudyPlans();
    }
  }, []);

  const loadStudyPlans = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getStudyPlans();
      setPlans(response.data);
    } catch (error) {
      console.error('Failed to load study plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const createStudyPlan = async () => {
    try {
      setLoading(true);
      const response = await apiClient.createStudyPlan({
        title,
        description,
        difficulty,
        totalHours,
        dailyStudyHours: dailyHours,
        startDate,
        endDate,
      });
      await loadStudyPlans();
      setTitle('');
      setDescription('');
      setTotalHours(40);
      setDailyHours(2);
      setStartDate('');
      setEndDate('');
      setMode('list');
    } catch (error) {
      console.error('Failed to create study plan:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateAIStudyPlan = async () => {
    try {
      setGenerating(true);
      // This would call an AI service to generate a study plan
      // For now, we'll create a basic plan
      const response = await apiClient.createStudyPlan({
        title: 'AI Generated Study Plan',
        description: 'Automatically generated study plan based on your goals',
        difficulty,
        totalHours,
        dailyStudyHours: dailyHours,
        startDate: startDate || new Date().toISOString().split('T')[0],
        endDate: endDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      });
      await loadStudyPlans();
      setMode('list');
    } catch (error) {
      console.error('Failed to generate study plan:', error);
    } finally {
      setGenerating(false);
    }
  };

  if (!isFeatureEnabled('studyPlanner')) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Study Planner</h2>
        <div className="flex gap-2">
          <Button
            variant={mode === 'list' ? 'default' : 'outline'}
            onClick={() => setMode('list')}
          >
            My Plans
          </Button>
          <Button
            variant={mode === 'create' ? 'default' : 'outline'}
            onClick={() => setMode('create')}
          >
            New Plan
          </Button>
        </div>
      </div>

      {mode === 'list' && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Your Study Plans</h3>
          {loading ? (
            <p>Loading...</p>
          ) : plans.length === 0 ? (
            <p className="text-gray-500">No study plans yet. Create your first one!</p>
          ) : (
            <div className="space-y-3">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className="p-4 border rounded hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    setCurrentPlan(plan);
                    setMode('detail');
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{plan.title}</h4>
                      <p className="text-sm text-gray-500">{plan.description}</p>
                      <p className="text-sm text-gray-400">
                        {plan.completedHours}/{plan.totalHours} hours • {plan.dailyStudyHours}h/day
                      </p>
                    </div>
                    <div className="flex flex-col gap-1 items-end">
                      <Badge>{plan.status}</Badge>
                      <Badge variant="outline">{plan.difficulty}</Badge>
                      {plan.aiGenerated && <Badge variant="secondary">AI Generated</Badge>}
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${(plan.completedHours / plan.totalHours) * 100}%`
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
          <h3 className="text-lg font-semibold mb-4">Create Study Plan</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Learn Python, Master Calculus"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your study goals..."
                className="w-full p-2 border rounded min-h-[100px]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Difficulty</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="BEGINNER">Beginner</option>
                  <option value="INTERMEDIATE">Intermediate</option>
                  <option value="ADVANCED">Advanced</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Daily Study Hours</label>
                <Input
                  type="number"
                  value={dailyHours}
                  onChange={(e) => setDailyHours(Number(e.target.value))}
                  min={1}
                  max={24}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Start Date</label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">End Date</label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Total Hours</label>
              <Input
                type="number"
                value={totalHours}
                onChange={(e) => setTotalHours(Number(e.target.value))}
                min={1}
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={createStudyPlan}
                disabled={!title || loading}
                className="flex-1"
              >
                {loading ? 'Creating...' : 'Create Plan'}
              </Button>
              <Button
                onClick={generateAIStudyPlan}
                disabled={generating}
                variant="outline"
                className="flex-1"
              >
                {generating ? 'Generating...' : 'Generate AI Plan'}
              </Button>
            </div>
          </div>
        </Card>
      )}

      {mode === 'detail' && currentPlan && (
        <div className="space-y-4">
          <Card className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold">{currentPlan.title}</h3>
                <p className="text-gray-500">{currentPlan.description}</p>
                <p className="text-sm text-gray-400">
                  {new Date(currentPlan.startDate).toLocaleDateString()} - {new Date(currentPlan.endDate).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <Badge>{currentPlan.status}</Badge>
                <Badge variant="outline" className="ml-2">{currentPlan.difficulty}</Badge>
                {currentPlan.aiGenerated && <Badge variant="secondary" className="ml-2">AI Generated</Badge>}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center p-3 bg-blue-50 rounded">
                <div className="text-2xl font-bold text-blue-600">{currentPlan.totalHours}h</div>
                <p className="text-sm text-gray-600">Total Hours</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded">
                <div className="text-2xl font-bold text-green-600">{currentPlan.completedHours}h</div>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded">
                <div className="text-2xl font-bold text-purple-600">{currentPlan.dailyStudyHours}h</div>
                <p className="text-sm text-gray-600">Daily Goal</p>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span>{Math.round((currentPlan.completedHours / currentPlan.totalHours) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full"
                  style={{
                    width: `${(currentPlan.completedHours / currentPlan.totalHours) * 100}%`
                  }}
                />
              </div>
            </div>
            <Button onClick={() => setMode('list')} variant="outline" className="mt-4">
              Back to List
            </Button>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Study Goals</h3>
            {goals.length === 0 ? (
              <p className="text-gray-500">No goals set yet.</p>
            ) : (
              <div className="space-y-2">
                {goals.map((goal) => (
                  <div
                    key={goal.id}
                    className={`p-3 border rounded ${goal.completed ? 'bg-green-50' : ''}`}
                  >
                    <div className="flex justify-between items-center">
                      <span className={goal.completed ? 'line-through text-gray-400' : ''}>
                        {goal.title}
                      </span>
                      <Badge variant={goal.completed ? 'default' : 'outline'}>
                        {goal.completed ? 'Done' : new Date(goal.targetDate).toLocaleDateString()}
                      </Badge>
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
