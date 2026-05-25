'use client';

import { useState, useEffect } from 'react';
import { isFeatureEnabled } from '@/lib/featureFlags';
import apiClient from '@/lib/apiClient';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface LearningPath {
  id: number;
  title: string;
  description: string;
  subject: string;
  level: string;
  status: string;
  totalModules: number;
  completedModules: number;
  estimatedHours: number;
  aiGenerated: boolean;
}

interface PathModule {
  id: number;
  title: string;
  description: string;
  order: number;
  estimatedHours: number;
  completed: boolean;
  completedAt?: string;
}

export default function LearningPathSystem() {
  const [paths, setPaths] = useState<LearningPath[]>([]);
  const [currentPath, setCurrentPath] = useState<LearningPath | null>(null);
  const [modules, setModules] = useState<PathModule[]>([]);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [subject, setSubject] = useState('');
  const [level, setLevel] = useState('BEGINNER');
  const [mode, setMode] = useState<'list' | 'detail' | 'create'>('list');

  useEffect(() => {
    if (isFeatureEnabled('learningPaths')) {
      loadLearningPaths();
    }
  }, []);

  const loadLearningPaths = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getLearningPaths();
      setPaths(response.data);
    } catch (error) {
      console.error('Failed to load learning paths:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadPathModules = async (pathId: number) => {
    try {
      setLoading(true);
      const response = await apiClient.getPathModules(pathId);
      setModules(response.data);
    } catch (error) {
      console.error('Failed to load modules:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateAILearningPath = async () => {
    try {
      setGenerating(true);
      const response = await apiClient.generateAILearningPath(subject, level);
      await loadLearningPaths();
      setSubject('');
      setLevel('BEGINNER');
      setMode('list');
    } catch (error) {
      console.error('Failed to generate learning path:', error);
    } finally {
      setGenerating(false);
    }
  };

  const completeModule = async (moduleId: number) => {
    try {
      await apiClient.completePathModule(moduleId);
      if (currentPath) {
        await loadPathModules(currentPath.id);
        await loadLearningPaths();
        const updated = paths.find(p => p.id === currentPath.id);
        if (updated) setCurrentPath(updated);
      }
    } catch (error) {
      console.error('Failed to complete module:', error);
    }
  };

  if (!isFeatureEnabled('learningPaths')) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Learning Paths</h2>
        <div className="flex gap-2">
          <Button
            variant={mode === 'list' ? 'default' : 'outline'}
            onClick={() => setMode('list')}
          >
            My Paths
          </Button>
          <Button
            variant={mode === 'create' ? 'default' : 'outline'}
            onClick={() => setMode('create')}
          >
            Generate Path
          </Button>
        </div>
      </div>

      {mode === 'list' && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Your Learning Paths</h3>
          {loading ? (
            <p>Loading...</p>
          ) : paths.length === 0 ? (
            <p className="text-gray-500">No learning paths yet. Generate your first one!</p>
          ) : (
            <div className="space-y-3">
              {paths.map((path) => (
                <div
                  key={path.id}
                  className="p-4 border rounded hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    setCurrentPath(path);
                    loadPathModules(path.id);
                    setMode('detail');
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{path.title}</h4>
                      <p className="text-sm text-gray-500">{path.subject}</p>
                      <p className="text-sm text-gray-400">{path.estimatedHours} hours estimated</p>
                    </div>
                    <div className="flex flex-col gap-1 items-end">
                      <Badge>{path.level}</Badge>
                      <Badge variant={path.status === 'COMPLETED' ? 'default' : 'secondary'}>
                        {path.status}
                      </Badge>
                      {path.aiGenerated && <Badge variant="outline">AI Generated</Badge>}
                      <div className="text-sm text-gray-600 mt-2">
                        {path.completedModules}/{path.totalModules} modules
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{
                          width: `${(path.completedModules / path.totalModules) * 100}%`
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
          <h3 className="text-lg font-semibold mb-4">Generate AI Learning Path</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Subject</label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g., Python, Machine Learning, Web Development"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Level</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="BEGINNER">Beginner</option>
                <option value="INTERMEDIATE">Intermediate</option>
                <option value="ADVANCED">Advanced</option>
              </select>
            </div>
            <Button
              onClick={generateAILearningPath}
              disabled={!subject || generating}
              className="w-full"
            >
              {generating ? 'Generating...' : 'Generate Path'}
            </Button>
          </div>
        </Card>
      )}

      {mode === 'detail' && currentPath && (
        <div className="space-y-4">
          <Card className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold">{currentPath.title}</h3>
                <p className="text-gray-500">{currentPath.description}</p>
                <p className="text-sm text-gray-400">{currentPath.subject}</p>
              </div>
              <div className="text-right">
                <Badge>{currentPath.level}</Badge>
                <Badge variant={currentPath.status === 'COMPLETED' ? 'default' : 'secondary'} className="ml-2">
                  {currentPath.status}
                </Badge>
                {currentPath.aiGenerated && <Badge variant="outline" className="ml-2">AI Generated</Badge>}
              </div>
            </div>
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span>{currentPath.completedModules}/{currentPath.totalModules} modules</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-600 h-3 rounded-full"
                  style={{
                    width: `${(currentPath.completedModules / currentPath.totalModules) * 100}%`
                  }}
                />
              </div>
            </div>
            <Button onClick={() => setMode('list')} variant="outline">
              Back to List
            </Button>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Modules</h3>
            {loading ? (
              <p>Loading...</p>
            ) : modules.length === 0 ? (
              <p className="text-gray-500">No modules yet.</p>
            ) : (
              <div className="space-y-3">
                {modules
                  .sort((a, b) => a.order - b.order)
                  .map((module, index) => (
                    <div
                      key={module.id}
                      className={`p-4 border rounded ${module.completed ? 'bg-green-50' : 'hover:bg-gray-50'}`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-gray-400">#{index + 1}</span>
                            <h4 className="font-medium">{module.title}</h4>
                            {module.completed && <Badge>Completed</Badge>}
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{module.description}</p>
                          <p className="text-sm text-gray-400">
                            {module.estimatedHours} hours
                          </p>
                          {module.completedAt && (
                            <p className="text-sm text-green-600">
                              Completed: {new Date(module.completedAt).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                        {!module.completed && (
                          <Button
                            onClick={() => completeModule(module.id)}
                            size="sm"
                          >
                            Complete
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
